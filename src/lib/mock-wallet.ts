import { BrowserProvider, Signer } from "ethers";

export class MockWalletProvider {
  private address: string;

  constructor(address: string) {
    this.address = address;
  }

  async request({ method }: { method: string }): Promise<unknown> {
    if (method === "kaia_requestAccounts") {
      return [this.address];
    }
    throw new Error(`Unsupported method: ${method}`);
  }
}

export class MockSigner extends Signer {
  private address: string;

  constructor(address: string) {
    super();
    this.address = address;
  }

  async getAddress(): Promise<string> {
    return this.address;
  }

  async signTransaction(_transaction: unknown): Promise<string> {
    // Return a dummy signature for testing
    return "0x" + "00".repeat(65);
  }

  connect(_provider: unknown): Signer {
    return this;
  }
}

export class MockBrowserProvider extends BrowserProvider {
  private mockWallet: MockWalletProvider;
  private mockSigner: MockSigner;

  constructor(address: string) {
    super(window.ethereum);
    this.mockWallet = new MockWalletProvider(address);
    this.mockSigner = new MockSigner(address);
  }

  async getSigner(): Promise<MockSigner> {
    return this.mockSigner;
  }

  getWalletProvider(): MockWalletProvider {
    return this.mockWallet;
  }
}
