import { scrypt, randomBytes, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(scrypt);

class _secret {
    readonly SALT_LENGTH = 22;
    readonly KEY_LENGTH = 35;

    public async gerar_hash_senha(password: string) {
        const salt = randomBytes(this.SALT_LENGTH);

        const derivedKey = await scryptAsync(password, salt, this.KEY_LENGTH) as Buffer;

        return salt.toString('base64') + '.' + derivedKey.toString('base64');
    }

    public async verificar_senha({ password, dashed_senha }: { password: string, dashed_senha: string }): Promise<boolean> {
        try {
            const [saltBase64, hashBase64] = dashed_senha.split('.');
            if (!saltBase64 || !hashBase64) return false;

            const salt = Buffer.from(saltBase64, 'base64');
            const storedHash = Buffer.from(hashBase64, 'base64');

            const derivedKey = await scryptAsync(password, salt, this.KEY_LENGTH) as Buffer;

            return timingSafeEqual(storedHash, derivedKey);
        } catch {
            return false;
        }
    }
}

export default new _secret