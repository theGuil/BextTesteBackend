import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/BextTesteGuilherme';

class DB {
    private uri: string = MONGODB_URI;

    public async start(): Promise<void> {
        if (mongoose.connection.readyState >= 1) return;

        try {
            await mongoose.connect(this.uri, {
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
            });
            console.log('✅ MongoDB conectado');
        } catch (error) {
            console.error('❌ Erro:', error);
            if (process.env.NODE_ENV === 'test') throw error;
            process.exit(1);
        }
    }

    public async stop(): Promise<void> {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }
    }

    public async clear(): Promise<void> {
        if (mongoose.connection.readyState !== 1) return;
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            await collections[key].deleteMany({});
        }
    }
}

const _db = new DB();

export default _db;