import { useState, useEffect, Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { 
	Flex,
	Image,
	Text,
	ChakraProvider,
	Spinner,
} from "@chakra-ui/react";
import "./App.scss";
import "./mdi/css/materialdesignicons.css";
import Aos from "aos";
import "aos/dist/aos.css";
import img1 from "./img1.png";
import img2 from "./img2.png";
import founder1 from "./founder1.png";
import founder2 from "./founder2.png";
import founder3 from "./founder3.png";
import founder4 from "./founder4.png";
import founder3small from "./founder3small.png";
import show1 from "./show1.png";
import show2 from "./show2.png";
import show3 from "./show3.png";
import show4 from "./show4.png";
import show5 from "./show5.png";
import show6 from "./show6.png";
import show7 from "./show7.png";
import show8 from "./show8.png";
import show9 from "./show9.png";
import show10 from "./show10.png";
import show11 from "./show11.png";
import show12 from "./show12.png";
import show13 from "./show13.png";
import show14 from "./show14.png";
import show15 from "./show15.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import icon from "./icon_pitch.png";
const TWITTER_LINK = "https://twitter.com/pitchweb3";
const INSTAGRAM_LINK = "https://www.instagram.com/";
const DISCORD_LINK = "https://discord.gg/"

// IMAGE ASSETS
// img1.png, img2.png are the guys that show up during the initial animation / bounce up and down
// icon.png is in the upper left part of the screen


function App() {
	const [isConnected, setIsConnected] = useState(false)
	const [correctNetwork, setCorrectNetwork] = useState(false)
	const [isMintActive, setIsMintActive] = useState(0)
	const [isPublicMintActive, setIsPublicMintActive] = useState(false)
	const [isPreMintActive, setIsPreMintActive] = useState(false)
	const [userAddress, setUserAddress] = useState("")
	const [loading, setLoading] = useState(false)
	const [funcRes, setFuncRes] = useState("")
	const [funcRes2, setFuncRes2] = useState("")
	const [funcTrue, setFuncTrue] = useState(false)
	const [mintAmount, setMintAmount] = useState(1)
	const [maxMintAmount, setMaxMintAmount] = useState(0)
	const [isCheckingMintState, setIsCheckingMintState] = useState(false)
	const [timesCheckedMintState, setTimesCheckedMintState] = useState(0)
	const [appShow, setAppShow] = useState(false)
	const [appShowImg, setAppShowImg] = useState(false)

	useEffect(() => {
		Aos.init({ duration: 1500 });
		setTimeout(function() {
			setAppShowImg(true)
		}, 500)
		setTimeout(function() {
			setAppShow(true)
		}, 2000)
	}, []);

	const showCase = [show1, show2, show3, show4, show5, show6, show7, show8]//, show9, show10, show11, show12, show13, show14, show15]

	const rdMaps = [ "World Cup excitement! Discord action centered around the tournament.", 
					"Banter, memes and frequent contests with amazing prizes.", 
					"Pitch will cover the tab of your group's watch party (2 each week)", 
					"Preview of artwork for 1st NFT collection; utility and mint details released." 
					]

	const rdMaps2 = [ "1st mini NFT collection launched Dec 15. Basic benefits include access to grand prizes for WC final; airdrops and access to project collaborations; allow-list spot for Pitch's main PFP collection launch in mid-January.", 
	"Organized and sponsored watch parties for later rounds of World Cup.", 
	"Creation of and initial setup of Pitch DAO.", 
]

	const rdMaps3 = [ "January: main launch of main PFP generative NFT collection.", 
	"Exclusive IRL community events and meetups, focused on EPL and Champions League.",
	"Finalize DAO governance and funding strategy.",
	"Announce partnerships with football teams, players and local community organizations.",
	"Define scope of digital platform for members and start building prototype app."
 ]

	const rdhDrive = [ 
		"We are a new startup with a <strong>mission</strong> to create a community devoted to the future of <em>the beautiful game</em> in web3.",
		"Pitch is a community to have a kickass time and meet fellow fans.",
		"We'll reward members with killer prizes and digitial collectibles.",
		"Ultimately, our <strong>vision</strong> of Pitch is a platform which spans our digital and physical worlds, including mobile-first applications at the center of the Football Web3 space."
]


	return (
		<ChakraProvider>
			<Flex minHeight="100vh" w="100%" direction="column" bg="linear-gradient(290deg, rgb(24, 56, 41), rgb(43, 125, 87))" color="#fff" fontFamily="chalk" px={["4%", "6%"]} pt={["4%", "2.8%"]} pb={["8%", "2.8%"]}>
				{
					!appShow ?
					<Flex w="100%" h="100%" position="fixed" top="0" left="0" zIndex="1000" bg="linear-gradient(290deg, rgb(24, 56, 41), rgb(43, 125, 87))" color="#fff" justify="center" align="center" direction="column" pb={["15%", "3%"]}>
							
							{
								appShowImg &&
								<Flex fontWeight="bold" fontSize={["25px", "50px"]} overflow="hidden">
									<Text data-aos="fade-left">Pitch</Text>
									<Text data-aos="fade-up" mx={["6", "10"]}>Web</Text>
									<Text data-aos="fade-right">3</Text>
								</Flex>
							}
					</Flex>
					:
					<>
						<Flex px={["4", "12"]} w="100%" bg="rgba(255,255,255,0.07)" align="center" position="sticky" top="0" borderRadius="8px" mb="6" zIndex="1" data-aos="fade-up" backdropFilter="blur(4px)" py="3">
							<Flex align="center">
								<Text fontWeight="bold" ml="3" display={["none", "block"]} textShadow="6px 2px rgb(70,70,70)" fontSize={["18px", "24px"]}>Pitch</Text>
							</Flex>
							<Flex flex="1" align="center" justify="flex-end">
								<Flex mr={["3", "7" ]} cursor="pointer" fontWeight="bold" border="1px solid #fff" py="3" borderRadius="8px" px="7" bg="rgba(255,255,255,0.2)" _hover={{ bg: "rgba(255,255,255,0.4)"}} display={["none", "flex"]} onClick={() => {
									var a = document.getElementById('rdMap')
									a.scrollIntoView({behavior: "smooth"})
								}}>Roadmap</Flex>

								<Flex fontSize={["18px", "20px"]} h={["40px", "45px"]} w={["40px", "45px"]} align="center" justify="center" borderRadius="100%" bg="rgba(255,255,255,0.9)" transition="300ms ease-in-out" _hover={{ bg: "rgba(255,255,255,0.7)"}} cursor="pointer"  mr={["3", "5" ]} onClick={() => window.open({TWITTER_LINK}, "_BLANK")} color="#1DA1F2"><i className="mdi mdi-twitter"></i></Flex>


								<Flex fontSize={["18px", "20px"]} h={["40px", "45px"]} w={["40px", "45px"]}  align="center" justify="center" borderRadius="100%" bg="rgba(255,255,255,0.9)" transition="300ms ease-in-out" _hover={{ bg: "rgba(255,255,255,0.7)"}} cursor="pointer"  color="#cd486b" mr={["3", "5" ]} onClick={() => window.open({INSTAGRAM_LINK}, "_BLANK")}><i className="mdi mdi-instagram"></i></Flex>

								<Flex fontSize={["18px", "20px"]} h={["40px", "45px"]} w={["40px", "45px"]}  align="center" justify="center" borderRadius="100%" bg="rgba(255,255,255,0.9)" transition="300ms ease-in-out" _hover={{ bg: "rgba(255,255,255,0.7)"}} cursor="pointer" color="#7289da" onClick={() => window.open({DISCORD_LINK}, "_BLANK")}><i className="mdi mdi-discord"></i></Flex>
							</Flex>
						</Flex>

						<Flex w="100%" justify="space-between" mt={["6", "12"]} mb="6" align="center" overflowX="hidden" direction={["column", "row"]}>
							<Flex w={["100%", "45%"]} direction="column">
								<Flex w="100%" direction="column" data-aos="fade-right" borderRadius="8px" py="6">
									<Flex align="center" mb="3" color="rgb(255, 0, 98)" fontSize="30px"><Text mb="15px">_</Text><Flex h="72px" w="72px" align="center" justify="center" borderRadius="100%" bg="rgb(80,80,130)" transition="300ms ease-in-out" _hover={{ bg: "rgb(100,100,150)"}} data-aos="fade-up" border="2px solid rgb(255, 0, 98)"><i className="mdi mdi-earth"></i></Flex></Flex>

									<Text color="rgb(200,200,250)" fontSize="20px">What is Pitch?</Text>
									<Text fontWeight="bold" fontSize={["28px", "30px"]}>Pitch is football.</Text>
									<Text fontWeight="bold" fontSize={["28px", "30px"]}>Pitch is community.</Text>
									<Text fontWeight="bold" fontSize={["28px", "30px"]}>Pitch is a place for digital collectibles.</Text>
								</Flex>
							</Flex>
						</Flex>
								
						<Text id="rdMap" visibility="hidden"></Text>
						<Flex w="100%" overflow="hidden" mt={["4", "0"]}>
							<Flex w={["90%", "70%"]} direction="column" data-aos="fade-right" bg="rgba(255,255,255,0.05)" borderRadius="8px" px={["6", "8"]} py="6">
								<Text fontSize={["15px", "17px"]}>
									<Flex align="center" mb="3" color="rgb(255, 213, 0)" fontSize="25px"><Flex h="60px" w="60px" align="center" justify="center" borderRadius="100%" bg="rgb(80,80,130)" transition="300ms ease-in-out" _hover={{ bg: "rgb(100,100,150)"}} data-aos="fade-up" border="2px solid rgb(255, 213, 0)"><i className="mdi mdi-rocket"></i></Flex><Text mb="10px">_</Text></Flex>

									<Text color="rgb(200,200,250)" mb="1" fontSize="20px">Pitch Roadmap</Text>
									<Text fontWeight="bold" fontSize={["20px", "30px" ]} mb="2">- Now</Text>
									<Flex direction="column" ml={["1", "12"]} w="100%" data-aos="fade-up">
										{
											rdMaps.map((item, index) => (
												<Flex key={index} w="100%" mb="4" justify="space-between" pr={["0", "10%"]}>
													<Text w={["35px", "60px"]} fontWeight="bold" fontSize={["18px", "40px" ]}color="rgb(200,200,250)">0{index + 1}.</Text>
													<Text w="90%" mt={["0", "3"]} fontSize={["18px", "21px"]}>{item}</Text>
												</Flex>
											))
										}
									</Flex>
								</Text>
							</Flex>
							<Flex w={["10%", "30%"]} mt="100px" borderTop={["8px solid rgba(255,255,255,0.05)", "15px solid rgba(255,255,255,0.05)"]} borderRight={["8px solid rgba(255,255,255,0.05)", "15px solid rgba(255,255,255,0.05)"]} borderTopRightRadius="15px"></Flex>
						</Flex>


						<Flex w="100%" mt={["6", "12"]} overflow="hidden">	
							<Flex w={["10%", "30%"]} mt="100px" borderTop={["8px solid rgba(255,255,255,0.05)", "15px solid rgba(255,255,255,0.05)"]} borderLeft={["8px solid rgba(255,255,255,0.05)", "15px solid rgba(255,255,255,0.05)"]} borderTopLeftRadius="15px"></Flex>
							<Flex w={["90%", "70%"]} direction="column" data-aos="fade-left" bg="rgba(255,255,255,0.05)" borderRadius="8px" px={["6", "8"]} py="6">
								<Text fontSize={["15px", "17px"]}>
									<Flex align="center" mb="3" color="rgb(255, 213, 0)" fontSize="25px"><Flex h="60px" w="60px" align="center" justify="center" borderRadius="100%" bg="rgb(80,80,130)" transition="300ms ease-in-out" _hover={{ bg: "rgb(100,100,150)"}} data-aos="fade-up" border="2px solid rgb(255, 213, 0)"><i className="mdi mdi-google-circles-extended"></i></Flex><Text mb="10px">_</Text></Flex>

									<Text color="rgb(200,200,250)" mb="1" fontSize="20px">Pitch Roadmap</Text>
									<Text fontWeight="bold" fontSize={["20px", "30px" ]} mb="2">- Soon</Text>
									<Flex direction="column" ml={["1", "12"]} w="100%" data-aos="fade-up">
										{
											rdMaps2.map((item, index) => (
												<Flex key={index} w="100%" mb="4" justify="space-between" pr={["0", "10%"]}>
													<Text w={["35px", "60px"]} fontWeight="bold" fontSize={["18px", "40px" ]}color="rgb(200,200,250)">0{index + 1}.</Text>
													<Text w="90%" mt={["0", "3"]} fontSize={["18px", "21px"]}>{item}</Text>
												</Flex>
											))
										}
									</Flex>
								</Text>
							</Flex>
						</Flex>

						<Flex w="100%" overflow="hidden" mt={["6", "12"]}>
							<Flex w={["90%", "70%"]} direction="column" data-aos="fade-right" bg="rgba(255,255,255,0.05)" borderRadius="8px" px={["6", "8"]} py="6">
								<Text fontSize={["15px", "17px"]}>
									<Flex align="center" mb="3" color="rgb(255, 213, 0)" fontSize="25px"><Flex h="60px" w="60px" align="center" justify="center" borderRadius="100%" bg="rgb(80,80,130)" transition="300ms ease-in-out" _hover={{ bg: "rgb(100,100,150)"}} data-aos="fade-up" border="2px solid rgb(255, 213, 0)"><i className="mdi mdi-crown"></i></Flex><Text mb="10px">_</Text></Flex>

									<Text color="rgb(200,200,250)" mb="1" fontSize="20px">Pitch Roadmap</Text>
									<Text fontWeight="bold" fontSize={["20px", "30px" ]} mb="2">- Future</Text>
									<Flex direction="column" ml={["1", "12"]} w="100%" data-aos="fade-up">
										{
											rdMaps3.map((item, index) => (
												<Flex key={index} w="100%" mb="4" justify="space-between" pr={["0", "10%"]}>
													<Text w={["35px", "60px"]} fontWeight="bold" fontSize={["18px", "40px" ]} color="rgb(200,200,250)">0{index + 1}.</Text>
													<Text w="90%" mt={["0", "3"]} fontSize={["18px", "21px"]}>{item}</Text>
												</Flex>
											))
										}
									</Flex>
								</Text>
							</Flex>
							<Flex w={["10%", "30%"]} mt="100px" borderTop={["8px solid rgba(255,255,255,0.05)", "15px solid rgba(255,255,255,0.05)"]} borderRight={["8px solid rgba(255,255,255,0.05)", "15px solid rgba(255,255,255,0.05)"]} borderTopRightRadius="15px"></Flex>
						</Flex>

						

						<Flex w="100%" mt={["6", "12"]} data-aos="fade-up" bg="rgba(255,255,255,0.05)" borderRadius="8px" px={["6", "8"]} py="6" direction="column">
							<Flex pr={["0", "5%" ]}align="flex-start" direction={["column", "row"]}>
								<Flex mr="6" mt={["2", "6"]} align="center" mb="3" color="rgb(0, 255, 234)" fontSize="50px"><Text mb="25px">_</Text><Flex h="100px" w="100px" align="center" justify="center" borderRadius="100%" bg="rgb(80,80,130)" transition="300ms ease-in-out" _hover={{ bg: "rgb(100,100,150)"}} data-aos="fade-up" border="2px solid rgb(0, 255, 234)"><i className="mdi mdi-rocket"></i></Flex></Flex>
								<Text>
									<Text mb="4" fontWeight="bold" fontSize="30px">What is Pitch and what are we really about?</Text>
									<Text mt="4">
										{
											rdhDrive.map((item, index) => (
												<Flex key={index} w="100%" mb="3" data-aos="fade-up">
													<Text fontWeight="bold" mr="3">_</Text>
													<Text fontSize="24px">{item}</Text>
												</Flex>
											))
										}
									</Text>
								</Text>
							</Flex>
						</Flex>

						<Flex w="100%" mt={["6", "12"]} data-aos="fade-up" bg="rgba(255,255,255,0.05)" borderRadius="8px" px={["6", "8"]} py="6" direction="column" align="center">
							<Flex align="flex-start" direction={["column", "row"]}>
								<Flex mr="6" mt={["2", "1"]} align="center" mb="3" color="rgb(255, 42, 0)" fontSize="50px"><Text mb="25px">_</Text><Flex h="100px" w="100px" align="center" justify="center" borderRadius="100%" bg="rgb(80,80,130)" transition="300ms ease-in-out" _hover={{ bg: "rgb(100,100,150)"}} data-aos="fade-up" border="2px solid rgb(255, 42, 0)"><i className="mdi mdi-eye"></i></Flex></Flex>
								<Text>
									<Text fontWeight="bold" fontSize="30px">OUR VISION</Text>
									<Text mb="4" fontSize="24px">We are guided by a simple vision which is onboarding and empowering Football fanatics in web3.</Text>
								</Text>
							</Flex>
						</Flex>

						<Flex justify="center" mt={["6", "12"]} backgroundColor="rgba(255,255,255,0.03)" borderRadius="8px" py="12" className="bgStars">
							<Flex w="100%" direction="column" align="center">
								<Text fontWeight="bold" fontSize={["24px", "30px"]}>
									The Team
								</Text>
								<Flex w="100%" align="center" justify="center" px="10%" direction={["column", "row"]}>
									<Flex direction="column" align="center" w={["100%", "50%"]} mb={["5", "0"]}>
										<Image w={["170px", "200px"]} h={["170px", "200px"]} borderRadius="100%" src={founder1} mt="6" data-aos="fade-up" />
										<Text textAlign="center" px={["2%", "10%"]} mt="6" data-aos="fade-up">
										<Text color="rgb(200,200,250)" cursor="pointer" mb="2" onClick={() => window.open("https://twitter.com/solsmahneth?s=21&t=_O59LWK2c3h6KY31ZgkOxw", "_BLANK")}>@Solsmahneth</Text>
										Also known as Tulipman in the community, Solsmahn is a UAE based Blockchain developer and NFT consultant
										</Text>
									</Flex>

									<Flex direction="column" align="center" w={["100%", "50%"]} mb={["5", "0"]}>
										<Image w={["170px", "200px"]} h={["170px", "200px"]} borderRadius="100%" src={founder2} mt="6" data-aos="fade-up" />
										<Text textAlign="center" px={["2%", "10%"]} mt="6" data-aos="fade-up">
										<Text color="rgb(200,200,250)" cursor="pointer" mb="2" onClick={() => window.open("https://twitter.com/mastrodre", "_BLANK")}>@Mastrodre</Text>
										Also known as OG kelvin is a Dubai based web 3 enthusiast and investor.
										</Text>
									</Flex>
								</Flex>

								<Flex align="center" w="100%" px="10%" direction={["column", "row"]} justify="center">

									<Flex w={["100%", "50%"]} direction="column" align="center">
										<Text fontWeight="bold" fontSize={["24px", "30px"]} mt={["12", "100px"]} mb="2" data-aos="fade-up">
											Developer
										</Text>

										<Flex w="100%" align="center" justify="center" px="0%" direction={["column", "row"]}>
											<Flex direction="column" align="center" w={["100%", "50%"]}>
												<Image w={["170px", "200px"]} h={["170px", "200px"]} borderRadius="100%" src={founder4} mt="6" data-aos="fade-up" />

												<Text textAlign="center" px={["2%", "10%"]} mt="6" data-aos="fade-up">
												<Text color="rgb(200,200,250)" cursor="pointer" mb="2" onClick={() => window.open("https://twitter.com/thelunalabs?s=11&t=26eD2Z6tX4ktKWIeAkj7kg", "_BLANK")}>@TheLunaLabs</Text>
												</Text>
											</Flex>
										</Flex>
									</Flex>
								</Flex>
							</Flex>
						</Flex>
						
						<Flex direction="column" mt={["6", "12"]} bgColor="rgba(255,255,255,0.03)" borderRadius="8px" py="12" px={["6", "0"]}>
							<Text textAlign="center"  data-aos="fade-up">Created by the RDH founders with special love to our community, Our friends, families, and loved ones</Text>
							
							<Text textAlign="center" mt="3"  data-aos="fade-up">For partnership inquiries, please contact <Text as="span" color="rgb(200,200,250)" mb="2" cursor="pointer" onClick={() => window.open("mailto: partnership@rdh.club")}>partnership@rdh.club</Text></Text>

							
							<Text textAlign="center" mt="3"  data-aos="fade-up">For all press inquiries, please contact <Text as="span" color="rgb(200,200,250)" mb="2" cursor="pointer" onClick={() => window.open("mailto: press@rdh.club")}>press@rdh.club</Text></Text>
							
							<Flex flex="1" align="center" justify="center" mt="8"  data-aos="fade-up">
							<Flex fontSize={["18px", "20px"]} h={["40px", "45px"]} w={["40px", "45px"]} align="center" justify="center" borderRadius="100%" bg="rgba(255,255,255,0.1)" transition="300ms ease-in-out" _hover={{ bg: "rgba(255,255,255,0.3)"}} cursor="pointer" className="bounce" mr={["3", "5" ]} onClick={() => window.open("https://twitter.com/RDHNFTs", "_BLANK")}><i className="mdi mdi-twitter"></i></Flex>

							<Flex fontSize={["18px", "20px"]} h={["40px", "45px"]} w={["40px", "45px"]}  align="center" justify="center" borderRadius="100%" bg="rgba(255,255,255,0.1)" transition="300ms ease-in-out" _hover={{ bg: "rgba(255,255,255,0.3)"}} className="bounce" mr={["3", "5" ]} cursor="pointer" onClick={() => window.open("https://discord.gg/rdhnft", "_BLANK")}><i className="mdi mdi-discord"></i></Flex>

							<Flex fontSize={["18px", "20px"]} h={["40px", "45px"]} w={["40px", "45px"]}  align="center" justify="center" borderRadius="100%" bg="rgba(255,255,255,0.1)" transition="300ms ease-in-out" _hover={{ bg: "rgba(255,255,255,0.3)"}} className="bounce2" onClick={() => window.open("https://www.instagram.com/rdhnfts/", "_BLANK")} cursor="pointer"><i className="mdi mdi-instagram"></i></Flex>
							</Flex>
						</Flex>

					</>
				}
			</Flex>
		</ChakraProvider>
	)
}

export default App;
