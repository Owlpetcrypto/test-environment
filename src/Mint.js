import React from "react";
import { useState, useEffect } from "react";
import Web3 from "web3";
import Web3EthContract from "web3-eth-contract";
import { ethers } from 'ethers'
import keccak256 from 'keccak256'
import MerkleTree from 'merkletreejs'
import { 
	Flex,
	Image,
	Text,
	ChakraProvider,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import wlt from './json/TEAM.json';
import wlw from './json/WL.json';
import nft3 from "./images/PITCH_OGPASS_Brrrr_02_1.mp4"
import nft2 from "./images/PITCH_OGPASS_MatchDay_03_1.mp4"
import nft1 from "./images/PITCH_OGPASS_StreetPitch_03_1.mp4"
import nft4 from "./images/OGPass_1.mp4"
import contractABI from "./json/contract_abi_v2h.json";
const NUM_TOKENS = 3
const tokenIds = [69,420,333]

const CHAIN_ID = 5
const CHAIN_NAME = "GOERLI"
const CONTRACT_ADDRESS = "0x03dc224c1501CD2A48Ac6795B1340000964691Db"
//const CHAIN_ID = 1
//const CHAIN_NAME = "ETH"

const Mint = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [isCorrectChain, setIsCorrectChain] = useState(false);
    const [mintAmount,       setMintAmount]         = useState(1)
    const [supplyMinted,     setSupplyMinted]       = useState("?/8888")
    const [tokenIndex, setTokenIndex] = useState(0);

    const handleConnectWallet = async() => {
        setIsButtonDisabled(true)
        await connectWallet()
        setIsButtonDisabled(false)
    }

    const handleMint = async() => {
        setIsButtonDisabled(true)
        await mint()
        setIsButtonDisabled(false)
    }

    const connectWallet = async () => {
        if (window.ethereum) {
            console.log("has window ethereum");

            var account;
            try {
                // account = await window.ethereum.request({method: 'eth_accounts'})
                let accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
                console.log("accounts: ", accounts)
                account = accounts[0]
                console.log("got account: ", account)
            } catch {
                alert("error grabbing account")
                console.log("error grabbing account");
                account = "";
                return {success: false}
            }

            if (account.length > 0) {
                var chainId;
                try {
                    chainId = await window.ethereum.request({method: 'net_version'})
                } catch {
                    alert("error grabbing account")
                    console.log("error grabbing account");
                    chainId = -1;
                    return {success: false}
                }

                setIsWalletConnected(true)

                if (Number(chainId) === CHAIN_ID) {
                    setIsCorrectChain(true)
                    return {success: true}
                } else {
                    setIsCorrectChain(false)
                    alert("Change chain to " + CHAIN_NAME);
                    return {success: false}
                }
            } else {
                setIsWalletConnected(false)
                setIsCorrectChain(false)
                alert("Could not get account - have you logged into metamask?")
                return {success: false}
            }
        } else {
            alert("install metamask extension!!");
            return {success: false}
        }
    };

    function hashAccount(userAddress) {
        return Buffer.from(ethers.utils.solidityKeccak256(['address'], [userAddress]).slice(2), 'hex');
    }

    const postRequestMerkle = async(wallet) => {          
        let merkleTreeTeam  = new MerkleTree(wlt.map(hashAccount), keccak256, { sortPairs: true });
        let merkleTreeWL    = new MerkleTree(wlw.map(hashAccount), keccak256, { sortPairs: true });
        let merkleProofTeam = merkleTreeTeam.getHexProof(hashAccount(wallet));
        let merkleProofWL   = merkleTreeWL.getHexProof(  hashAccount(wallet));

        console.log("team hex root: ", merkleTreeTeam.getHexRoot());
        console.log("wl hex root: ", merkleTreeWL.getHexRoot());

        if        (merkleTreeTeam.verify(merkleProofTeam, keccak256(wallet), merkleTreeTeam.getHexRoot())) {
            return [merkleProofTeam, "team"]
        } else if (merkleTreeWL.verify(  merkleProofWL,   keccak256(wallet), merkleTreeWL.getHexRoot())) {
            return [merkleProofWL, "wl"]
        } else {
            return [-1, -1]
        }
    }

    const mint = async() => {
        Web3EthContract.setProvider(window.ethereum);
        const web3 = new Web3(window.ethereum);

        console.log("contractABI: ", contractABI)
        console.log("CONTRACT_ADDRESS: ", CONTRACT_ADDRESS);
        const SmartContractObj = new Web3EthContract(contractABI, CONTRACT_ADDRESS);

        // do merkle check first
		const values = await postRequestMerkle(window.ethereum.selectedAddress);
		console.log("values: ", values);
		const mintType = values[1];
		const merkleProof = values[0];

        let tokenId = tokenIds[tokenIndex];
        let gasLimitEstimate;
        let gasPriceEstimate;
        let receipt;
        console.log("tokenId: ", tokenId)
        if (mintType === "team") {
            try {
                gasLimitEstimate = await SmartContractObj.methods.mintTeam_rPN(mintAmount, tokenId, merkleProof).estimateGas({
                    from: window.ethereum.selectedAddress
                });
            } catch (err) {
                console.log("116 team mint err: ", err);
                alert("Team Mint: error estimating gas");
                setIsButtonDisabled(false);
                return;
            }

			gasPriceEstimate = await web3.eth.getGasPrice();
			console.log({resultOfGasLimitEstimate: gasLimitEstimate});
            console.log({resultOfGasPriceEstimate: gasPriceEstimate});

            try {
				receipt = await SmartContractObj.methods.mintTeam_rPN(mintAmount, tokenId, merkleProof).send({
					gasLimit: String(Math.round(1.2 * gasLimitEstimate)),
					gasPrice: String(Math.round(1.1 * gasPriceEstimate)),
					to: CONTRACT_ADDRESS,
					from: window.ethereum.selectedAddress});
				console.log("132 WL mint receipt: ", receipt);
                alert("Team Mint: Successfully minted your Pitch NFTs!");
                setIsButtonDisabled(false);
                return;
			}
			catch (err) {
				console.log("135 WL mint err", err);
				alert("Team Mint: error minting your NFT(s).");
                setIsButtonDisabled(false);
                return;
            }
        } else {
            let localSaleState = await SmartContractObj.methods.saleState().call();
            localSaleState = Number(localSaleState)
            if (localSaleState === 0) {
                alert("Error: sale is not active (WL).");
                setIsButtonDisabled(false);
                return;
            } else if (localSaleState === 2) { // public
                let totalCostWei = await SmartContractObj.methods.tokenCostPublic(tokenId).call();
                totalCostWei = String(totalCostWei*mintAmount)
                console.log("totalCostWei public: ", totalCostWei);
                try {
                    gasLimitEstimate = await SmartContractObj.methods.mintPublic_K2E(mintAmount, tokenId).estimateGas({
                        from: window.ethereum.selectedAddress,
                        value: totalCostWei
                    });
                } catch (err) {
                    console.log("151 mint err: ", err);
                    alert("Mint: error estimating gas");
                    setIsButtonDisabled(false);
                    return;
                }
    
                gasPriceEstimate = await web3.eth.getGasPrice();
                console.log({resultOfGasLimitEstimate: gasLimitEstimate});
                console.log({resultOfGasPriceEstimate: gasPriceEstimate});
    
                try {
                    receipt = await SmartContractObj.methods.mintPublic_K2E(mintAmount, tokenId).send({
                        gasLimit: String(Math.round(1.2 * gasLimitEstimate)),
                        gasPrice: String(Math.round(1.1 * gasPriceEstimate)),
                        to: CONTRACT_ADDRESS,
                        from: window.ethereum.selectedAddress,
                        value: totalCostWei
                    });
                    console.log("165 mint receipt: ", receipt);
                    alert("Successfully minted your Pitch NFTs!")
                    setIsButtonDisabled(false);
                    return;
                }
                catch (err) {
                    console.log("135 WL mint err", err);
                    alert("Team Mint: error minting your NFT(s).");
                    setIsButtonDisabled(false);
                    return;
                }
            } else {
                if (mintType !== "wl") {
                    alert("Error: public sale is not yet active and this wallet is not WL'd.");
                    setIsButtonDisabled(false);
                    return;
                }
                let totalCostWei = await SmartContractObj.methods.tokenCostWl(tokenId).call();
                totalCostWei = String(totalCostWei*mintAmount)
                console.log("totalCostWei public: ", totalCostWei);

                try {
                    gasLimitEstimate = await SmartContractObj.methods.mintWl_ffv(mintAmount, tokenId, merkleProof).estimateGas({
                        from: window.ethereum.selectedAddress,
                        value: totalCostWei
                    });
                } catch (err) {
                    console.log("182 WL mint err: ", err);
                    alert("WL Mint: error estimating gas");
                    setIsButtonDisabled(false);
                    return;
                }
    
                gasPriceEstimate = await web3.eth.getGasPrice();
                console.log({resultOfGasLimitEstimate: gasLimitEstimate});
                console.log({resultOfGasPriceEstimate: gasPriceEstimate});
    
                try {
                    receipt = await SmartContractObj.methods.mintWl_ffv(mintAmount, tokenId, merkleProof).send({
                        gasLimit: String(Math.round(1.2 * gasLimitEstimate)),
                        gasPrice: String(Math.round(1.1 * gasPriceEstimate)),
                        to: CONTRACT_ADDRESS,
                        from: window.ethereum.selectedAddress,
                        value: totalCostWei
                    });
                    console.log("196 WL mint receipt: ", receipt);
                    alert("WL Mint: Successfully minted your Pitch NFTs!")
                    setIsButtonDisabled(false);
                    return;
                }
                catch (err) {
                    console.log("200 WL mint err", err);
                    alert("WL Mint: error minting your NFT(s).");
                    setIsButtonDisabled(false);
                    return;
                }
            }
        }
    }

    const handlePlusButton = async() => {
        setIsButtonDisabled(true);

        let tokenId = tokenIds[tokenIndex]
        if (!isWalletConnected) {
            alert("Must Connect Wallet Before Incrementing Mint Amount.")
        } else{
            Web3EthContract.setProvider(window.ethereum);
            const web3 = new Web3(window.ethereum);
            const SmartContractObj = new Web3EthContract(contractABI, CONTRACT_ADDRESS);
            let localSaleState = await SmartContractObj.methods.saleState().call();
            localSaleState = Number(localSaleState)
            console.log("localSaleState: ", localSaleState);
            let walletBalanceToken = await SmartContractObj.methods.balanceOf(window.ethereum.selectedAddress, tokenId).call();
            walletBalanceToken = Number(walletBalanceToken)
            console.log("244 walletBalanceToken: ", walletBalanceToken);
            let maxPerWalletToken;
            let maxPerWalletTotal;
            let totalMinted;
            if (localSaleState === 0) {
                const values = await postRequestMerkle(window.ethereum.selectedAddress);
                const mintType = values[1];
                console.log("values: ", values)
                console.log("mintType: ", mintType)
                if (mintType !== "team") {
                    alert("Mint is inactive")
                    maxPerWalletToken = 0
                    maxPerWalletTotal = 0
                    totalMinted = 0
                } else {
                    console.log("maxPerWalletTeam")
                    maxPerWalletToken = await SmartContractObj.methods.maxPerWalletTokenTeam(tokenId).call();
                    maxPerWalletTotal = await SmartContractObj.methods.maxPerWalletTotalTeam().call();
                    totalMinted = await SmartContractObj.methods.walletTotalMintedTeam(window.ethereum.selectedAddress).call();
                }
            } else {
                if (localSaleState === 1) { // wl
                    console.log("maxPerWalletWl")
                    maxPerWalletToken = await SmartContractObj.methods.maxPerWalletTokenWl(tokenId).call();
                    maxPerWalletTotal = await SmartContractObj.methods.maxPerWalletTotalWl().call();
                    totalMinted = await SmartContractObj.methods.walletTotalMintedWl(window.ethereum.selectedAddress).call();
                } else if (localSaleState === 2) { // public
                    console.log("maxPerWalletPublic")
                    maxPerWalletToken = await SmartContractObj.methods.maxPerWalletTokenPublic(tokenId).call();
                    maxPerWalletTotal = await SmartContractObj.methods.maxPerWalletTotalPublic().call();
                    totalMinted = await SmartContractObj.methods.walletTotalMintedPublic(window.ethereum.selectedAddress).call();
                }
            }
            totalMinted = Number(totalMinted)
            maxPerWalletToken = Number(maxPerWalletToken)
            maxPerWalletTotal = Number(maxPerWalletTotal)

            console.log("mintAmount, maxPerWalletToken, walletBalanceToken, maxPerWalletTotal, totalMinted: ", mintAmount, maxPerWalletToken, walletBalanceToken, maxPerWalletTotal, totalMinted);
            let localMintAmount = Math.min(mintAmount + 1, maxPerWalletToken - walletBalanceToken, maxPerWalletTotal - totalMinted);
            localMintAmount = Math.max(localMintAmount, 0);
            setMintAmount(localMintAmount);
        }

        setIsButtonDisabled(false);
    }

    const handleMinusButton = () => {
        setIsButtonDisabled(true);

        let localMintAmount = Math.max(0, mintAmount - 1)
        setMintAmount(localMintAmount);

        setIsButtonDisabled(false);
    }

    const decrementTokenIndex = () => {
        setIsButtonDisabled(true);
        let localTokenIndex = (tokenIndex - 1) % NUM_TOKENS;
        setTokenIndex(localTokenIndex)
        setIsButtonDisabled(false);
    }

    const incrementTokenIndex = () => {
        setIsButtonDisabled(true);
        let localTokenIndex = (tokenIndex + 1) % NUM_TOKENS;
        setTokenIndex(localTokenIndex)
        setIsButtonDisabled(false);
    }

    return (
        <ChakraProvider>
        	<Flex direction="column" w="100vw" height="100vh" className='greenPitchBkg' fontFamily="PoppinsMedium" color="white">
            {/* <Flex minHeight="60vh" w="100%" direction="column" bg="#1D8E65" color="white" fontFamily="PoppinsMedium"> */}
                <Navbar />
                <Flex w={["100%", "70%"]} height={["70%"]} mt={["0", "12"]} bg="rgba(255,255,255,0.05)" borderRadius="8px" ml={[0, "15%"]} py="6" direction="column" align="center"
                    style={{marginBottom: "200px"}}>
                    <h1 className="mintHeader" fontFamily="PoppinsExtraBold" fontSize="24px">Pitch Mint</h1>
                    {!isWalletConnected ?
                        <button className="ConnectMintButton" disabled={isButtonDisabled} onClick={handleConnectWallet}>Connect Wallet</button>
                    :
                        <button className="ConnectMintButton" disabled={isButtonDisabled} onClick={handleMint}>Mint</button>
                    }
                    <Flex marginTop="24px" marginBottom="12px" direction="row">
                        <button className="pmButton" disabled={isButtonDisabled} onClick={handleMinusButton}>-</button>
                        <Text w="12px" fontSize="24px">{mintAmount}</Text>
                        <button className="pmButton" disabled={isButtonDisabled} onClick={handlePlusButton}>+</button>
                    </Flex>
                    <Text fontSize="24px" marginBottom="12px">Token Id: {tokenIds[tokenIndex]}</Text>
                    <Flex direction="row">
                        <button className="tokenIdPM" disabled={isButtonDisabled} onClick={decrementTokenIndex} fontSize="96px">&lt;</button>
                        
                        {tokenIndex === 0 &&
                            <video controls width="250">
                                <source src={nft1} type="video/mp4"></source>
                            </video>
                        }
                        {tokenIndex === 1 &&
                            <video controls width="250">
                                <source src={nft2} type="video/mp4"></source>
                            </video>
                        }
                        {tokenIndex === 2 &&
                            <video controls width="250">
                                <source src={nft3} type="video/mp4"></source>
                            </video>
                        }
                        {tokenIndex === 4 &&
                            <video controls width="250">
                                <source src={nft4} type="video/mp4"></source>
                            </video>
                        }
                        
                        <button className="tokenIdPM" disabled={isButtonDisabled} onClick={incrementTokenIndex}>&gt;</button>
                    </Flex>
                </Flex>
            </Flex>
        </ChakraProvider>
    );
};

export default Mint;
