import mongoose from 'mongoose';
import './envConfig.js';

const MONGODB_URI = process.env.MONGODB_URI;

async function main() {
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    const menuSchema = new mongoose.Schema({
        category: String,
        subcategory: String,
        title: String,
        price: Number,
        img: String,
    }, { collection: 'menus' });

    const Menu = mongoose.model('Menu', menuSchema);
    const isFiniteNumber = (value) => typeof value === 'number' && isFinite(value);

    try {
        const cursor = Menu.find({ price: { $exists: true } }).cursor();
        let updated = 0;
        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            const orig = doc.price;
            if (!isFiniteNumber(orig)) {
                console.warn(`Skipping _id=${doc._id}: price is not a finite number (${orig})`);
                continue;
            }
            const newPrice = parseFloat(orig * 10);
            if (newPrice !== orig) {
                doc.price = newPrice;
                await doc.save();
                updated++;
                console.log(`Updated _id=${doc._id}: ${orig} -> ${newPrice}`);
            }
        }

        console.log(`Done. Documents updated: ${updated}`);
    } catch (err) {
        console.error('Error:', err);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
    }  
    
}

main();