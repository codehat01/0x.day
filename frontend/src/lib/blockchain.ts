import SHA256 from 'crypto-js/sha256';

export interface Block {
  index: number;
  timestamp: number;
  fileHash: string;
  fileName: string;
  ipfsCid: string;
  ipfsUrl: string;
  previousHash: string;
  nonce: number;
  hash: string;
}

export class Blockchain {
  chain: Block[] = [];
  difficulty: number;

  constructor(difficulty: number = 4) {
    this.difficulty = difficulty;
    this.createGenesisBlock();
  }

  private createGenesisBlock(): void {
    const genesisBlock = {
      index: 0,
      timestamp: Date.now(),
      fileHash: "genesis_file_hash",
      fileName: "genesis",
      ipfsCid: "",
      ipfsUrl: "",
      previousHash: "0",
      nonce: 0,
      hash: ""
    } as Block;
    
    genesisBlock.hash = this.proofOfWork(genesisBlock);
    this.chain.push(genesisBlock);
  }

  private calculateHash(block: Omit<Block, 'hash'>): string {
    return SHA256(JSON.stringify({
      index: block.index,
      timestamp: block.timestamp,
      fileHash: block.fileHash,
      fileName: block.fileName,
      ipfsCid: block.ipfsCid,
      ipfsUrl: block.ipfsUrl,
      previousHash: block.previousHash,
      nonce: block.nonce
    })).toString();
  }

  private proofOfWork(block: Omit<Block, 'hash'>): string {
    let nonce = 0;
    let hash = '';
    
    do {
      block.nonce = nonce;
      hash = this.calculateHash(block);
      nonce++;
    } while (hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join("0"));

    return hash;
  }

  addBlock(fileHash: string, fileName: string, ipfsCid: string, ipfsUrl: string): Block {
    const previousBlock = this.chain[this.chain.length - 1];
    const newBlock = {
      index: previousBlock.index + 1,
      timestamp: Date.now(),
      fileHash,
      fileName,
      ipfsCid,
      ipfsUrl,
      previousHash: previousBlock.hash,
      nonce: 0,
      hash: ''
    } as Block;

    newBlock.hash = this.proofOfWork(newBlock);
    this.chain.push(newBlock);
    return newBlock;
  }

  verifyFile(fileHash: string): Block[] {
    return this.chain.filter(block => block.fileHash === fileHash);
  }

  checkDuplicateBeforeAdd(fileHash: string): boolean {
    return this.chain.some(block => block.fileHash === fileHash);
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== this.calculateHash(currentBlock)) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      if (currentBlock.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join("0")) {
        return false;
      }
    }
    return true;
  }
}