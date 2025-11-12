import mongoose from "mongoose";
import './envConfig.js';

const MONGODB_URI = process.env.MONGODB_URI;

// Filename to find and replacement
const BAD_FILENAME = 'Cake_RedVekvetRoyale.png';
const GOOD_FILENAME = 'Cake_RedVelvetRoyale.png';

async function main() {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');

  // Schema only for convenience; collection name 'menus'
  const menuSchema = new mongoose.Schema({}, { strict: false, collection: 'menus' });
  const Menu = mongoose.model('Menu', menuSchema);

  try {
    // Match documents where img equals the bad filename OR ends with "/.../BAD_FILENAME" or ".\...\BAD_FILENAME"
    // Use regex to match at end of string with either slash/backslash or nothing before
    const escaped = BAD_FILENAME.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`${escaped}$`); // ends with BAD_FILENAME

    const filter = { img: { $type: 'string', $regex: regex } };

    // Use updateMany to update all matches. If you prefer to preview matches first, run find(filter).limit(...)
    const updateResult = await Menu.updateMany(filter, [
      // Use aggregation pipeline update to safely replace only the filename portion while preserving path
      {
        $set: {
          img: {
            // If img equals the bad filename exactly, set to GOOD_FILENAME
            // else if img endsWith BAD_FILENAME with path, replace the ending segment preserving prefix
            $let: {
              vars: {
                imgStr: '$img',
                bad: BAD_FILENAME,
                good: GOOD_FILENAME
              },
              in: {
                $cond: [
                  { $eq: ['$$imgStr', '$$bad'] },
                  '$$good',
                  {
                    $cond: [
                      { $regexMatch: { input: '$$imgStr', regex: regex } },
                      {
                        // split on BAD_FILENAME and replace last occurrence with GOOD_FILENAME
                        $concat: [
                          {
                            $arrayElemAt: [
                              { $split: ['$$imgStr', '$$bad'] },
                              0
                            ]
                          },
                          '$$good'
                        ]
                      },
                      // fallback (shouldn't happen) — keep original
                      '$$imgStr'
                    ]
                  }
                ]
              }
            }
          }
        }
      }
    ], {});

    console.log('Update result:', updateResult);
    console.log('Done.');
  } catch (err) {
    console.error('Error:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

main();