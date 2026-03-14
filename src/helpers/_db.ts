import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/BextTesteGuilherme';

const _db = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(MONGODB_URI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
        });

        console.log('✅ MongoDB conectado com sucesso!');
    } catch (error) {
        console.error('❌ Erro na conexão:', error);
        process.exit(1);
    }
};

export default _db