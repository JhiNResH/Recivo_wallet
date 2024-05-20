import "../polyfills";

import Web3Auth from '@web3auth/modal';
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from '@web3auth/base';
import SolanaPrivateKeyProvider from '@web3auth/solana-provider';
import Constants, { AppOwnership } from "expo-constants";
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
// import { getCurrentUser, signIn } from "../../lib/appwrite";
// import { useGlobalContext } from "../../context/GlobalProvider";
import FormField from "../../components/FormField";



const resolvedRedirectUrl =
  Constants.appOwnership == AppOwnership.Expo || Constants.appOwnership == AppOwnership.Guest
    ? Linking.createURL("web3auth", {})
        : Linking.createURL("web3auth", { scheme: scheme });
    
const chainConfig = {
            chainId: "0x3",
            chainNamespace: CHAIN_NAMESPACES.SOLANA,
            rpcTarget: "https://api.testnet.solana.com",
            tickerName: "SOLANA",
            ticker: "SOL",
            decimals: 18,
            blockExplorerUrl: "https://explorer.solana.com/?cluster=testnet",
            logo: "https://images.toruswallet.io/sol.svg"
          };

          useEffect(() => {
            const init = async () => {
              try {
        
                const solanaPrivateKeyPrvoider = new SolanaPrivateKeyProvider({
                  config: { chainConfig: chainConfig }
                })
        
                const web3auth = new Web3Auth({
                  clientId,
                  // uiConfig refers to the whitelabeling options, which is available only on Growth Plan and above
                  // Please remove this parameter if you're on the Base Plan
                  uiConfig: {
                    appName: "W3A Heroes",
                    mode: "light",
                    loginMethodsOrder: ["apple", "google", "twitter"],
                    logoLight: "https://web3auth.io/images/web3authlog.png",
                    logoDark: "https://web3auth.io/images/web3authlogodark.png",
                    defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
                    loginGridCol: 2,
                    primaryButton: "externalLogin", // "externalLogin" | "socialLogin" | "emailLogin"
                    uxMode: "redirect",
                  },
                  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
                  privateKeyProvider: solanaPrivateKeyPrvoider
                });
        
        
                // Setup external adapaters
                const adapters = await getDefaultExternalAdapters({
                  options: {
                    clientId,
                    chainConfig,
                  }
                });
                adapters.forEach((adapter) => {
                  web3auth.configureAdapter(adapter);
                });
        
                setWeb3auth(web3auth);
        
                await web3auth.initModal();
                setProvider(web3auth.provider);
        
                if (web3auth.connected) {
                  setLoggedIn(true);
                }
              } catch (error) {
                console.error(error);
              }
            };
        
            init();
          }, [] );
        
          const login = async () => {
            if (!web3auth) {
              uiConsole("web3auth not initialized yet");
              return;
            }
            const web3authProvider = await web3auth.connect();
        
            if (web3auth.connected) {
              setLoggedIn(true);
            }
            setProvider(web3authProvider);
          };
        
          const addChain = async () => {
            if (!provider) {
              uiConsole("provider not initialized yet");
              return;
            }
        
            const chainConfig = {
              chainId: "0x2",
              displayName: "Solana Testnet",
              chainNamespace: CHAIN_NAMESPACES.SOLANA,
              tickerName: "SOLANA",
              ticker: "SOL",
              decimals: 18,
              rpcTarget: "https://api.testnet.solana.com",
              blockExplorerUrl: "https://explorer.solana.com/?cluster=testnet",
              logo: "https://images.toruswallet.io/sol.svg"
            };
        
            await web3auth?.addChain(chainConfig);
            uiConsole("New Chain Added");
          };

          const logout = async () => {
            if (!web3auth) {
              uiConsole("web3auth not initialized yet");
              return;
            }
            await web3auth.logout();
            setProvider(null);
            setLoggedIn(false);
          };

function uiConsole(...args) {
    const el = document.querySelector("#console>p");
    if (el) {
        el.innerHTML = JSON.stringify(args || {}, null, 2);
    }

const loggedInView = (
    <>
      <div className="flex-container">
      <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
      </div> 
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}>Logged in Successfully!</p>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <div className="container">
      <h1 className="title">
        <a target="_blank" href="https://web3auth.io/docs/sdk/pnp/web/modal" rel="noreferrer">
          Web3Auth{" "}
        </a>
        & ReactJS Solana Example
      </h1>

      <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>

      <footer className="footer">
        <a
          href="https://github.com/Web3Auth/web3auth-pnp-examples/tree/main/web-modal-sdk/blockchain-connection-examples/solana-modal-example"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
      </footer>
    </div>
  );
}