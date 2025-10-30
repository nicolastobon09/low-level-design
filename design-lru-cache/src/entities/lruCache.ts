import { DoublyLinkedList } from "./doublyLinkedList";
import { Node } from "./node";

export class LRUCache<K, V> {
    private readonly capacity: number;
    private readonly map: Map<K, Node<K, V>>;
    private readonly dll: DoublyLinkedList<K, V>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.map = new Map<K, Node<K, V>>();
        this.dll = new DoublyLinkedList<K, V>();
    }

    get(key: K): V | null {
        if (!this.map.has(key)) {
            return null;
        }
        const node = this.map.get(key)!;
        this.dll.moveToFront(node);
        return node.value;
    }

    put(key: K, value: V): void {
        if (this.map.has(key)) {
            // Update existing key
            const node = this.map.get(key)!;
            node.value = value;
            this.dll.moveToFront(node);
        } else {
            // Add new key
            if (this.map.size === this.capacity) {
                // Evict least recently used
                const lru = this.dll.removeLast();
                if (lru) {
                    this.map.delete(lru.key);
                }
            }
            const newNode = new Node(key, value);
            this.dll.addFirst(newNode);
            this.map.set(key, newNode);
        }
    }

    remove(key: K): void {
        if (!this.map.has(key)) {
            return;
        }
        const node = this.map.get(key)!;
        this.dll.remove(node);
        this.map.delete(key);
    }
}