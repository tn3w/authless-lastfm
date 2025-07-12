const envCache = new Map();

export function getEnv(name, defaultValue = null) {
    if (envCache.has(name)) {
        return envCache.get(name);
    }

    const value = process.env[name];

    if (!value) {
        if (defaultValue === true) {
            throw new Error(`Environment variable ${name} is required but was not set.`);
        }
        envCache.set(name, defaultValue);
        return defaultValue;
    }

    envCache.set(name, value);
    return value;
}
