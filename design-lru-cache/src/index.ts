import { LRUCache } from "./entities/lruCache";

class LRUCacheDemo {
    static main(): void {
        console.log("=== LRU Cache Demo ===\n");

        const cache = new LRUCache<string, number>(3);

        console.log("1. Adding initial items:");
        cache.put("a", 1);
        cache.put("b", 2);
        cache.put("c", 3);

        // Accessing 'a' (makes it most recently used)
        const valueA = cache.get("a");
        console.log(`Get 'a': ${valueA}`);

        // Adding 'd' (should evict 'b' - the LRU item)
        cache.put("d", 4);

        // Trying to get 'b' (should return null)
        const valueB = cache.get("b");
        console.log(`Get 'b': ${valueB}`);
    }

}

// Run the demos
LRUCacheDemo.main();