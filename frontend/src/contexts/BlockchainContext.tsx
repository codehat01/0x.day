import React, { createContext, useCallback, useState } from 'react';
import { Blockchain, Block } from '../lib/blockchain';

interface BlockchainContextType {
  blockchain: Blockchain;
  isValid: boolean;
  addBlock: (fileHash: string, fileName: string, ipfsCid: string, ipfsUrl: string) => Block;
}

export const BlockchainContext = createContext<BlockchainContextType | null>(null);

export function BlockchainProvider({ children }: { children: React.ReactNode }) {
  const [blockchain] = useState(() => new Blockchain(4));
  const [isValid, setIsValid] = useState(true);

  const addBlock = useCallback(
    (fileHash: string, fileName: string, ipfsCid: string, ipfsUrl: string) => {
      const block = blockchain.addBlock(fileHash, fileName, ipfsCid, ipfsUrl);
      setIsValid(blockchain.isChainValid());
      return block;
    },
    [blockchain]
  );

  return (
    <BlockchainContext.Provider value={{ blockchain, isValid, addBlock }}>
      {children}
    </BlockchainContext.Provider>
  );
}
