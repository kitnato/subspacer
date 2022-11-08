# Subspacer

![Subspacer screenshot](/public/subspacer-screenshot-v1.0.0.png?raw=true)

Subspacer is a simple web-based dApp that allows the user to connect to a [Substrate Framework](https://substrate.io/) wallet via browser extension, upload files from their local device to the [Subspace Network](https://subspace.network/) blockchain and then retrieve those files mimicking a traditional 3-stage cloud-based file-storage solution.

It creates a simple API provided by [polkadot{.js}](https://github.com/polkadot-js) to connect a user-specified account address, asking the user to choose the files they want to upload (with certain limitations on format, size and quantity), then enabling their retrieval once they have been stored.

There is no live site, because at the time of publication there were no live public Subspace Network testnets to connect to. A quick and easy way to live host a serverless project such as this could be provided by [Netlify](https://app.netlify.com).

For enhancements and known issues, please see the project's [Github issues](https://github.com/cneuro/subspacer/issues).

## Set up

You will need a command-line interface (CLI) on any operating system, as well as [git](https://git-scm.com/downloads) and [NPM](hto\ztps://docs.npmjs.com/cli/v8/configuring-npm/install) installed globally.

### Connecting to blockchain

Before running this dApp locally, you must set up and run the Subspace Network blockchain on your device in development mode, in case public live testnets are unavailable.

To do so, follow the instructions [here](https://github.com/subspace/subspace/blob/main/docs/development.md).

> NB: Syncing the node in local offline dev mode will take several hours.

In the case of a public live Subspace Network being available, you may alternatively set the appropriate node and farmer web socket addresses in the `.env` file. Please see step 6 in the [Local environment](#local-environment).

### Installing a wallet

A Substrate Framework browser extension wallet is needed to be able to send and sign blockchain transactions. It is recommended to use [Polkadot{.js}](https://polkadot.js.org/extension/) and to set it up using a known [dev account derivative](https://polkadot.js.org/docs/keyring/start/suri/#dev-accounts).

To do so;

1. Install the extension in your browser
1. Open it, selecting the plus icon in the upper right corner, then "Import account from pre-existing seed"
1. Enter the known dev wallet mnemonic `bottom drive obey lake curtain smoke basket hold race lonely fit walk`
1. Click "Advanced" and then enter `//Alice` (or `//Bob` etc.) in the "Derivation path", then click Next
1. Set a password. You will need to enter it when uploading files to Subspace

Alternatively, you can create your own wallet account or use the [Subwallet](https://subwallet.app) extension instead.

### Local environment

Next, you must run the app locally.

1. Open the CLI and change into a suitable directory
1. Run `git clone git@github.com:cneuro/subspacer.git`
1. Run `cd subspacer`
1. Run `npm install`
1. Copy `.env.example` and name it `.env`
1. _(Optional)_ If you are not running your local node and farmer in dev mode, change the two variables to the appropriate environments. See examples [here](https://github.com/subspace/subspace.js/tree/main/examples/ts-node#connecting-to-the-network).
1. Run `npm start`
1. Open [http://localhost:5173](http://localhost:5173) in a web browser.

### Local development

Before committing any changes, please do the following:

1. In the CLI, go to the project folder
1. Run `npm run prepare`

Now on every commit all the relevant linters & formatters will apply any changes automatically according to best practices along with running the test suite (see [Testing](#testing)).

The linter config can be viewed in `.eslintrc.json` and `.prettierc.json`.

## Usage

The UI changes to show prompts, errors and allows actions as the user progresses through the intended process ("happy path").

Throughout, if there are errors or timeouts, pressing the "Connect wallet" or "Reconnect" button will re-initiate the process and any errors should be explained in an error popup.

### Connection

1. Connect a wallet by clicking "Connect wallet".
1. Choose an account to connect to in the wallet when prompted (e.g. "Alice").
1. The app will attempt to connect to the wallet and subsequently Subspace Network. The status is shown.
1. If you have several accounts, you may choose which address to use in the dropdown "Using account".

### Submission

1. Click "Choose files" and select as many as 6 files to upload.
1. Preview the files to upload in "Ready to upload". Only images are shown as full previews.
1. Remove any ready files by clicking on their preview.
1. Add any further files if desired (maximum of 6).
1. When ready, click "Upload to Subspace".

### Retrieval

1. As files are successfully uploaded, their respective `objectID` is listed.
1. Once the files are archived on the blockchain, they will be available to be retrieved by clicking "Retrieve uploaded files".
1. As retrieval occurs, the files are previewed.
1. Click any of the previews to download them to your device

> NB: Archiving on the Subspace Network blockchain takes 100-120 blocks to complete before retrieval will work. If using a live Subspace testnet you can view it on the [block explorer](https://polkadot.js.org/apps).

## Testing

Ideally there would be a suite of fully-automated tests with decent coverage of the "happy path".

Currently, there are only a set of basic page status checks asserted using [Playwright](https://playwright.dev), which is a simple and intuitive framework to define plain-language assertions, mocks and end-to-end test flows in all modern browsers. To connect a wallet to the automated process, the [Substrate Uri](https://polkadot.js.org/docs/keyring/start/suri) methods of polkadot.js can be used with the dev wallet mnemonic and a known derivation.

The tests can be run via `npm test`. Currently there is one test case located in `src/tests`. The tests are also run on commit (see [Local development](#local-development)).

## Implementation

- Built on [Vite](https://vitejs.dev).

- Written in [TypeScript](https://www.typescriptlang.org).

- UI framework is provided by [Bootstrap](https://react-bootstrap.github.io).

- State management library is [Recoil](https://recoiljs.org).

- Tests are implemented with [Playwright](https://playwright.dev).

- Code style & linting is provided by [eslint](https://eslint.org), [stylelint](https://stylelint.io) and [prettier](https://prettier.io).

- Automation is provided by [husky](https://typicode.github.io/husky) and [lint-staged](https://www.npmjs.com/package/lint-staged).

## License

This work is licensed under the [GNU General Public License version 3](https://www.gnu.org/licenses/gpl-3.0.en.html).
