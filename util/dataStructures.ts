// queue like class that contains numbers and keeps track of the sum
// TODO: abstract collection / queue classes
export class SumQueue {
  private storage: number[] = [];
  private sum: number;
  constructor() {
    this.sum = 0;
  }

  enqueue(item: number): void {
    this.storage.push(item);
    this.sum += item;
  }

  dequeue(): number {
    const removed = this.storage.shift();
    if (removed !== undefined) this.sum -= removed;
    return removed;
  }

  getSize(): number {
    return this.storage.length;
  }

  getSum(): number {
    return this.sum;
  }

  getValues(): number[] {
    return this.storage;
  }
}
