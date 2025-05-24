/// <reference types="webdriverio" />
/// <reference types="@wdio/globals/types" />
/// <reference types="@wdio/mocha-framework" />

declare namespace WebdriverIO {
  interface Browser {
    getByTestId(id: string): ChainablePromiseElement<Element>;
    getByText(text: string):   ChainablePromiseElement<Element>;
  }
}
