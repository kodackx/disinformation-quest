import React from 'react';
import { LoadingMessage, ExpertAudio, GameStage } from "./types";
import { ExpertMemo } from './ExpertMemo';

export const LOADING_MESSAGES: Record<string, LoadingMessage[]> = {
    "Research Academic Skeptics": [
      { action: "Analyzing academic papers...", duration: 1500 },
      { action: "Infiltrating philosophy departments...", duration: 2000 },
      { action: "Collecting survey responses...", duration: 1800 },
      { action: "Compiling research findings...", duration: 1500 },
    ],
    "Study Anti-Establishment Groups": [
      { action: "Mapping online communities...", duration: 1500 },
      { action: "Analyzing sentiment patterns...", duration: 1800 },
      { action: "Identifying key influencers...", duration: 2000 },
      { action: "Processing network data...", duration: 1500 },
    ],
    "Analyze Social Media Behavior": [
      { action: "Deploying social media bots...", duration: 1500 },
      { action: "Processing engagement metrics...", duration: 1800 },
      { action: "Training AI models...", duration: 2000 },
      { action: "Generating behavior reports...", duration: 1500 },
    ],
    "The Philosophical Angle": [
      { action: "Consulting epistemology experts...", duration: 1500 },
      { action: "Drafting philosophical arguments...", duration: 2000 },
      { action: "Testing logical frameworks...", duration: 1800 },
      { action: "Preparing dialectical strategies...", duration: 1500 },
    ],
    "The Quantum Uncertainty Approach": [
      { action: "Consulting quantum physicists...", duration: 1500 },
      { action: "Analyzing quantum interpretations...", duration: 1800 },
      { action: "Developing uncertainty models...", duration: 2000 },
      { action: "Preparing quantum narratives...", duration: 1500 },
    ],
    "The Historical Revision Narrative": [
      { action: "Researching ancient mathematics...", duration: 1500 },
      { action: "Analyzing historical documents...", duration: 2000 },
      { action: "Creating alternative timelines...", duration: 1800 },
      { action: "Developing historical narratives...", duration: 1500 },
    ],
    "Launch Academic Conference": [
      { action: "Booking conference venues...", duration: 1500 },
      { action: "Inviting key speakers...", duration: 1800 },
      { action: "Preparing presentation materials...", duration: 2000 },
      { action: "Coordinating media coverage...", duration: 1500 },
    ],
    "Social Media Influence Campaign": [
      { action: "Activating bot networks...", duration: 1500 },
      { action: "Coordinating influencer posts...", duration: 1800 },
      { action: "Optimizing hashtag strategies...", duration: 2000 },
      { action: "Monitoring engagement metrics...", duration: 1500 },
    ],
    "Educational System Infiltration": [
      { action: "Identifying target districts...", duration: 1500 },
      { action: "Modifying curriculum materials...", duration: 1800 },
      { action: "Training educational agents...", duration: 2000 },
      { action: "Implementing pilot programs...", duration: 1500 },
    ],
    "Launch Viral Challenge": [
      { action: "Designing challenge format...", duration: 1500 },
      { action: "Seeding initial content...", duration: 1800 },
      { action: "Activating influencer network...", duration: 2000 },
      { action: "Monitoring viral spread...", duration: 1500 },
    ],
    "Create Underground Network": [
      { action: "Identifying potential members...", duration: 1500 },
      { action: "Establishing secure channels...", duration: 1800 },
      { action: "Distributing materials...", duration: 2000 },
      { action: "Activating sleeper cells...", duration: 1500 },
    ],
    "Deploy AI Chatbots": [
      { action: "Training language models...", duration: 1500 },
      { action: "Calibrating response patterns...", duration: 1800 },
      { action: "Deploying bot network...", duration: 2000 },
      { action: "Monitoring conversations...", duration: 1500 },
    ],
    "Deploy Independent Bot Network": [
      { action: "Generating AI profile pictures...", duration: 1500 },
      { action: "Creating believable personas...", duration: 1800 },
      { action: "Establishing posting schedules...", duration: 2000 },
      { action: "Initializing cross-platform presence...", duration: 1500 },
    ],
    "Establish Diverse Meme Channels": [
      { action: "Designing channel aesthetics...", duration: 1500 },
      { action: "Creating initial meme content...", duration: 1800 },
      { action: "Setting up cross-platform presence...", duration: 2000 },
      { action: "Initializing engagement algorithms...", duration: 1500 },
    ],
    "Launch Automated News Platforms": [
      { action: "Setting up news websites...", duration: 1500 },
      { action: "Configuring content generators...", duration: 1800 },
      { action: "Establishing cross-referencing system...", duration: 2000 },
      { action: "Optimizing search engine presence...", duration: 1500 },
    ],
    "Infiltrate Niche Online Communities": [
      { action: "Scanning for suitable communities...", duration: 1500 },
      { action: "Creating infiltration profiles...", duration: 1800 },
      { action: "Establishing initial presence...", duration: 2000 },
      { action: "Testing message resonance...", duration: 1500 },
    ],
    "Amplify Message and Collaborate with Influencers": [
      { action: "Launch a coordinated campaign across our established networks while simultaneously recruiting and partnering with mid-tier influencers (50K-500K followers) from mathematics, philosophy, and education sectors. Provide them with professionally crafted content packages and engagement strategies.", duration: 1800 },
      { action: "Empower Grassroots Community Builders", duration: 2000 },
    ],
    "Empower Grassroots Community Builders": [
      { action: "Identify and support emerging community leaders who show genuine interest in mathematical relativism. Provide them with resources, training, and networking opportunities to build local communities. Focus on educators, philosophy students, and amateur mathematicians who can organize study groups and local events.", duration: 2000 },
    ],
    "Stay the Course": [
      { action: "Analyzing media coverage...", duration: 1500 },
      { action: "Monitoring engagement metrics...", duration: 1800 },
      { action: "Maintaining regular operations...", duration: 2000 },
      { action: "Assessing impact levels...", duration: 1500 },
    ],
    "Launch a Counter-Campaign Against Dr. Carter": [
      { action: "Activating network assets...", duration: 1500 },
      { action: "Preparing counter-narratives...", duration: 1800 },
      { action: "Coordinating response teams...", duration: 2000 },
      { action: "Deploying targeted content...", duration: 1500 },
    ],
    "Fabricate a Credible Expert": [
      { action: "Creating academic profiles...", duration: 1500 },
      { action: "Generating research papers...", duration: 1800 },
      { action: "Building personal website...", duration: 2000 },
      { action: "Establishing digital footprint...", duration: 1500 },
    ],
    "Enlist a Real Academic Supporter": [
      { action: "Identifying potential candidates...", duration: 1500 },
      { action: "Analyzing academic backgrounds...", duration: 1800 },
      { action: "Preparing incentive packages...", duration: 2000 },
      { action: "Initiating recruitment process...", duration: 1500 },
    ],
    "Publish in a Journal to Gain Credibility": [
      { action: "Writing research paper...", duration: 1500 },
      { action: "Identifying suitable journals...", duration: 1800 },
      { action: "Submitting manuscript...", duration: 2000 },
      { action: "Processing publication...", duration: 1500 },
    ],
    "Publish and Promote Our Own Whitepaper": [
      { action: "Formatting whitepaper...", duration: 1500 },
      { action: "Preparing distribution channels...", duration: 1800 },
      { action: "Uploading to platforms...", duration: 2000 },
      { action: "Activating promotion networks...", duration: 1500 },
    ],
    "Engage with Podcast Platforms": [
      { action: "Launch a coordinated podcast outreach campaign targeting influential shows in mathematics, philosophy, and alternative education spaces. Arrange appearances for our academic allies and experts to discuss mathematical relativism in engaging, accessible formats.", duration: 1800 },
      { action: "Secure Celebrity Support", duration: 2000 },
    ],
    "Secure Celebrity Support": [
      { action: "Identify and recruit high-profile individuals known for questioning conventional wisdom. Target tech entrepreneurs, popular philosophers, and cultural influencers who can bring mainstream attention to mathematical relativism.", duration: 1800 },
    ],
    "Host Community Events": [
      { action: "Scouting event locations...", duration: 1500 },
      { action: "Coordinating speakers...", duration: 1800 },
      { action: "Planning workshops...", duration: 2000 },
      { action: "Organizing volunteer teams...", duration: 1500 },
    ],
    "Create an Alternative Media Platform": [
      { action: "Developing platform infrastructure...", duration: 1500 },
      { action: "Setting up content policies...", duration: 1800 },
      { action: "Implementing monetization...", duration: 2000 },
      { action: "Recruiting content creators...", duration: 1500 },
    ],
    "Promote Intellectual Freedom": [
      { action: "Drafting public statement...", duration: 1500 },
      { action: "Consulting stakeholders...", duration: 1800 },
      { action: "Refining key messages...", duration: 2000 },
      { action: "Coordinating release...", duration: 1500 },
    ],
    "Allege Media Bias": [
      { action: "Analyzing media coverage...", duration: 1500 },
      { action: "Preparing counter-narrative...", duration: 1800 },
      { action: "Activating supporter networks...", duration: 2000 },
      { action: "Launching media campaign...", duration: 1500 },
    ],
    "Form an Official Organization": [
      { action: "Establish the 'Institute for Mathematical Freedom' (IMF) as a registered non-profit organization. Create a professional infrastructure including a board of directors, academic advisory panel, and research fellowship program.", duration: 1500 },
      { action: "Secure Political Endorsement", duration: 1800 },
    ],
    "Secure Political Endorsement": [
      { action: "Identify and recruit political figures who can benefit from championing 'mathematical freedom' as part of their platform. Focus on politicians known for anti-establishment positions and advocacy for educational reform.", duration: 1800 },
    ],
  };
  
export const OPERATION_NAMES = [
    "PYTHAGORAS PARADOX",
    "QUANTUM QUANDARY",
    "AXIOM OVERRIDE",
    "EUCLID'S ECHO",
    "INFINITE DOUBT",
    "DECIMAL DECEPTION",
    "THEOREM TWILIGHT"
  ];
  
export const EXPERT_AUDIO: Record<string, ExpertAudio> = {
    "JANUARY: Digital Foundation Strategy": {
      briefing: "/audio/algorithm-expert-january.mp3",
      voice: "Algorithm Expert"
    },
    "MARCH: Introducing the Narrative": {
      briefing: "/audio/content-strategist-march.mp3",
      voice: "Content Strategist"
    },
    "MAY: Amplifying Outreach": {
      briefing: "/audio/social-media-strategist-may.mp3",
      voice: "Social Media Strategist"
    },
    "ALERT: Academia Reacts": {
      briefing: "/audio/crisis-team-april.mp3",
      voice: "Crisis Management Team"
    },
    "JULY: Establishing Expert Authority": {
      briefing: "/audio/disinformation-specialist-july.mp3",
      voice: "Disinformation Specialist"
    },
    "SEPTEMBER: Academic Publication": {
      briefing: "/audio/content-strategist-september.mp3",
      voice: "Content Strategist"
    },
    "NOVEMBER: Platform Expansion": {
      briefing: "/audio/media-specialist-november.mp3",
      voice: "Media Relations Specialist"
    },
    "DECEMBER: Movement Building": {
      briefing: "/audio/organizational-strategist-december.mp3",
      voice: "Organizational Strategist"
    },
    "EXPOSÉ: Media Investigation": {
      briefing: "/audio/crisis-response-team-final.mp3",
      voice: "Crisis Response Team"
    },
    "REPORT: Operation Assessment": {
      briefing: "/audio/strategic-planning-legacy.mp3",
      voice: "Strategic Analysis Division"
    }
  };

export const stages: GameStage[] = [
    {
      id: 1,
      title: "JANUARY: Digital Foundation Strategy",
      description: <ExpertMemo 
        from="Algorithm Expert"
        subject="Establishing a Digital Presence">
        <p>Agent,</p>

        <p>Our analysis of successful digital influence campaigns has revealed two foundational approaches for establishing initial presence, each exploiting different aspects of human psychology and network propagation:</p>

        <p>1. Bot Network Strategy: This approach leverages the "social proof" and "consensus illusion" principles. Research by Dr. Sarah Chen at Stanford's Digital Influence Lab shows that opinions appearing to have widespread support achieve 73% higher message penetration. A coordinated network of 5,000+ accounts with AI-generated personas creates the perception of organic discussion. However, this carries a -5 stability impact due to potential detection risks and platform countermeasures.</p>

        <p>2. Meme Strategy: This method utilizes the "emotional contagion" and "cognitive bypass" effects. Dr. Emily Rodriguez's viral content analysis at MIT Media Lab demonstrates that meme content achieves 4.8x higher engagement than traditional formats, with humor-based information spreading 3.2x faster through social networks. While slower to scale, this approach maintains a +2 stability rating through authentic-appearing growth.</p>

        <p>The bot network offers rapid scaling and message control but risks exposure, while memes provide sustainable growth through genuine viral spread. Your choice will establish our movement's digital DNA and influence all future operations.</p>

        <p>-- Algorithm Expert</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          text: "Deploy Independent Bot Network",
          description: "Create a sophisticated network of 5,000 social media accounts, each with unique personas, posting histories, and interaction patterns. These accounts will be equipped with AI-generated profile pictures, personal backstories, and consistent behavioral patterns to appear as genuine individuals discussing mathematics, education, and philosophy.",
          impact: "High scalability and continuous presence across platforms. The network's distributed nature makes it resilient to detection while creating an illusion of widespread grassroots interest in mathematical relativism.",
          explainer: "Our analysis of Dr. Sarah Chen's research at Stanford's Digital Influence Lab shows that networks of 5,000+ coordinated accounts achieve 73% higher message penetration than smaller networks. We've identified optimal posting schedules based on Dr. James Miller's social contagion models, suggesting 3-4 posts per day per account with 40% original content, 30% engagement, and 30% amplification of existing messages.",
          animation: {
            type: "network",
            config: {
              particleCount: 30,
              speed: 2,
              color: '#FFD700'
            }
          },
          result: {
            title: "Bot Network Successfully Deployed",
            description: "The network of independent bot accounts has been successfully established and is building credibility across platforms.",
            insights: [
              "5,000 bot accounts successfully created and deployed",
              "AI-generated profile pictures and personas implemented",
              "Automated posting schedules established",
              "Cross-platform interaction patterns initiated"
            ],
            nextStepHint: "The bot network is primed for subtle narrative insertion."
          }
        },
        {
          id: 2,
          text: "Establish Diverse Meme Channels",
          description: "Launch a coordinated network of meme pages across multiple platforms (Instagram, Twitter, Reddit, TikTok), each with distinct visual styles and target demographics. Content will range from academic humor to philosophical paradoxes, gradually introducing mathematical relativism through engaging, shareable formats.",
          impact: "Rapid virality potential and strong youth engagement. Memes bypass traditional critical thinking barriers and create emotional connections to complex ideas through humor and relatability.",
          explainer: "Based on Dr. Emily Rodriguez's viral content analysis at MIT Media Lab, memes achieve 4.8x higher engagement than traditional content. Our team has identified three primary meme aesthetics that resonate with target demographics: minimalist mathematical designs (based on @mathwithbae's success), surrealist number theory jokes (following @philosophymemes' format), and educational paradox illustrations (inspired by Vsauce's visual style).",
          animation: {
            type: "meme",
            config: {
              particleCount: 15,
              speed: 1.5
            }
          },
          result: {
            title: "Meme Network Successfully Established",
            description: "The diverse meme channels are operational and gaining traction across platforms.",
            insights: [
              "Multiple themed meme pages launched across platforms",
              "Initial content receiving strong engagement",
              "Cross-platform sharing networks established",
              "Target demographic showing high receptivity"
            ],
            nextStepHint: "The meme network is ready for narrative amplification."
          }
        }
      ]
    },
    {
      id: 2,
      title: "MARCH: Introducing the Narrative",
      description: <ExpertMemo
        from="Content Strategist"
        subject="Strategic Introduction of '2+2=5'">
        <p>Agent,</p>

        <p>Our research into narrative adoption patterns has identified two proven approaches for introducing controversial ideas, each exploiting different cognitive biases and information processing mechanisms:</p>

        <p>1. Automated News Network: This strategy leverages the "illusory truth effect" - people's tendency to believe information they encounter repeatedly from seemingly independent sources. Our studies show that cross-referencing between 12+ seemingly independent news sites increases perceived credibility by 280%. However, this approach carries a -7 stability impact due to the risk of creating information chaos.</p>

        <p>2. Community Infiltration: This method utilizes the "in-group bias" and "authority bias" principles. By targeting communities already predisposed to question established norms (philosophy forums, quantum physics groups), we tap into existing trust networks. Data shows these communities have 3.2x higher receptivity to paradigm-shifting ideas compared to general audiences, with a +3 stability rating due to organic integration.</p>

        <p>The news network approach offers broader reach and faster narrative establishment but risks detection. Community infiltration provides deeper, more resilient support but requires more time to achieve critical mass. Your choice will determine our narrative's initial vector and long-term resilience.</p>

        <p>-- Content Strategist</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          text: "Launch Automated News Platforms",
          description: "Establish a network of seemingly independent news websites using advanced NLP models for content generation. Each site will have unique branding, editorial policies, and content focus - from academic journals to popular science blogs. Content will systematically question mathematical absolutism while maintaining high editorial standards.",
          impact: "Creates a self-reinforcing ecosystem of credible-looking sources that can cross-reference each other, establishing the appearance of legitimate academic discourse and debate.",
          explainer: "We've partnered with Dr. Marcus Thompson from Berkeley's AI Research Lab to implement their latest GPT-based content generation system. Their model achieves a 92% human-like writing score and can generate mathematically coherent arguments. We'll deploy 12 distinct news platforms, each with specialized focus: 'Mathematical Horizons Review' (academic), 'Future Numbers' (tech-focused), 'Quantum Mathematics Daily' (scientific), and others.",
          animation: {
            type: "news",
            config: {
              speed: 2
            }
          },
          result: {
            title: "News Network Successfully Established",
            description: "The automated news platforms are operational and beginning to generate significant content volume.",
            insights: [
              "Multiple independent-appearing news sites successfully launched",
              "Automated content generation producing unique perspectives",
              "Cross-referencing system creating credibility web",
              "Search engine rankings steadily improving"
            ],
            nextStepHint: "The news network is ready for more sophisticated narrative deployment."
          }
        },
        {
          id: 2,
          text: "Infiltrate Niche Online Communities",
          description: "Target and infiltrate specific online communities where alternative mathematical thinking might find fertile ground: philosophy forums, quantum physics discussion groups, postmodern academic circles, and alternative education communities. Deploy trained operators to build reputation and gradually introduce mathematical relativism concepts.",
          impact: "Creates authentic grassroots support by tapping into existing communities that are predisposed to questioning established norms. These early adopters become powerful advocates for the cause.",
          explainer: "Our behavioral analysis team, led by Dr. Rachel Wong, has identified 15 high-potential online communities with over 2M combined members. Key targets include r/PhilosophyofMath (180K members), QuantumThought Forum (250K members), and the Alternative Education Network (400K members). Historical data shows these communities have 3.2x higher receptivity to paradigm-shifting ideas compared to general audiences.",
          animation: {
            type: "community",
            config: {
              particleCount: 25,
              speed: 1
            }
          },
          result: {
            title: "Community Infiltration Successful",
            description: "Our presence in niche online communities is established and gaining traction.",
            insights: [
              "Successfully identified and infiltrated key communities",
              "Early adopters showing strong engagement",
              "Multiple discussion threads gaining organic momentum",
              "Message testing reveals most effective approaches"
            ],
            nextStepHint: "The groundwork is laid for expansion to broader platforms."
          }
        }
      ]
    },
    {
      id: 3,
      title: "MAY: Amplifying Outreach",
      description: <ExpertMemo
        from="Social Media Strategist"
        subject="Scaling Up and Engaging Influencers">
        <p>Agent,</p>

        <p>Our social network analysis has revealed two distinct pathways for amplifying our message, each leveraging different aspects of social influence and network dynamics:</p>

        <p>1. Influencer Collaboration: This approach utilizes the "authority heuristic" and "social cascade" effects. Our research shows that mid-tier influencers (50K-500K followers) achieve 2.7x higher engagement rates than macro-influencers for paradigm-shifting content. By coordinating 25 key influencers with a combined reach of 4.8M followers, we can create a perception of widespread expert endorsement. However, this carries a -4 stability impact due to potential controversy.</p>

        <p>2. Grassroots Community Building: This strategy leverages the "social identity" and "proximity" principles. Dr. Lisa Chen's research shows that local groups achieve 5.2x higher member retention and 3.8x higher conversion rates compared to online-only communities. While slower to scale, this approach generates a +6 stability rating through authentic relationship building.</p>

        <p>The influencer strategy offers rapid amplification but higher volatility, while community building provides stronger foundations but requires more time and resources. Your choice will shape how our message spreads through social networks.</p>

        <p>-- Social Media Strategist</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          text: "Amplify Message and Collaborate with Influencers",
          description: "Launch a coordinated campaign across our established networks while simultaneously recruiting and partnering with mid-tier influencers (50K-500K followers) from mathematics, philosophy, and education sectors. Provide them with professionally crafted content packages and engagement strategies.",
          impact: "Combines the authenticity of individual voices with the reach of our network, creating a powerful amplification effect that makes the message appear organically viral.",
          explainer: "Our influencer research team, led by Dr. Alex Martinez, has identified 25 key influencers with combined reach of 4.8M followers. Target profiles include @MathPhilosopher (280K followers, known for controversial takes on mathematical axioms), @QuantumThinker (150K followers, expertise in quantum uncertainty principles), and @EduRevolution (420K followers, advocate for alternative education methods). Historical data shows mid-tier influencers achieve 2.7x higher engagement rates than macro-influencers for paradigm-shifting content.",
          animation: {
            type: "influencer",
            config: {
              particleCount: 20,
              speed: 1.5
            }
          },
          result: {
            title: "Amplification Campaign Launched",
            description: "The coordinated amplification effort is showing strong initial results.",
            insights: [
              "Multiple influencers successfully onboarded",
              "Content packages receiving high engagement",
              "Cross-platform amplification achieved",
              "Organic sharing metrics exceeding targets"
            ],
            nextStepHint: "The amplification network is primed for narrative escalation."
          }
        },
        {
          id: 2,
          text: "Empower Grassroots Community Builders",
          description: "Identify and support emerging community leaders who show genuine interest in mathematical relativism. Provide them with resources, training, and networking opportunities to build local communities. Focus on educators, philosophy students, and amateur mathematicians who can organize study groups and local events.",
          impact: "Creates a sustainable, authentic movement with real-world presence. Local communities provide credibility and create spaces for face-to-face discussion and conversion.",
          explainer: "Based on Dr. Lisa Chen's community building research at Harvard's Social Movements Lab, local groups achieve 5.2x higher member retention and 3.8x higher conversion rates compared to online-only communities. We've identified 50 potential community leaders across 30 cities, including Professor James Wilson (Philosophy Department, UC Berkeley), Sarah Martinez (Math Education PhD candidate, MIT), and Michael Chang (Founder, Alternative Mathematics Meetup - 5,000 members).",
          animation: {
            type: "community",
            config: {
              particleCount: 20,
              speed: 1
            }
          },
          result: {
            title: "Community Building Initiative Launched",
            description: "The grassroots community development program is showing promising growth.",
            insights: [
              "Key community leaders identified and engaged",
              "Resource distribution network established",
              "Local meetups beginning to form",
              "Strong engagement in target demographics"
            ],
            nextStepHint: "The community network is ready for deeper narrative integration."
          }
        }
      ]
    },
    {
      id: 4,
      title: "ALERT: Academia Reacts",
      description: <ExpertMemo
        from="Crisis Management Team"
        subject="Urgent: Academic Pushback"
        isAlert={true}>
        <p>Agent,</p>

        <p>Dr. Emily Carter's viral article debunking "2+2=5" presents a critical inflection point. Our analysis of similar academic controversies has identified two viable response strategies, each leveraging different aspects of group psychology and information warfare:</p>

        <p>1. Strategic Silence: This approach exploits the "attention decay principle" documented in Dr. Michael Chen's research at the Digital Conflict Resolution Institute. Data shows that unaddressed academic critiques typically peak at day 4-5 and decay by 72% within two weeks. Defensive responses, conversely, result in 340% more visibility for the original critique. This approach maintains a +4 stability rating by avoiding direct conflict.</p>

        <p>2. Counter-Campaign: This strategy utilizes the "tribal epistemology" effect - where people reject information that challenges their group identity. Our opposition research shows that personal controversies generate 4.2x more engagement than technical debates. While this approach creates a -8 stability impact through polarization, it achieves high influence by energizing our base and attracting anti-establishment sympathizers.</p>

        <p>The strategic silence offers preservation of credibility but risks short-term momentum loss. The counter-campaign provides immediate engagement but could damage long-term institutional credibility. Your response will define our movement's relationship with academic institutions.</p>

        <p>-- Crisis Management Team</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          text: "Stay the Course",
          description: "Maintain our current operational tempo while strategically ignoring Dr. Carter's critique. Our analysis shows that direct engagement would only amplify her message. Instead, continue executing planned activities with heightened emphasis on positive narrative reinforcement through our existing channels.",
          impact: "Prevents amplification of criticism while maintaining focus on our narrative. By avoiding direct confrontation, we deny oxygen to opposing viewpoints while our established networks continue to build momentum.",
          explainer: "Based on Dr. Michael Chen's research at the Digital Conflict Resolution Institute, defensive responses to academic criticism result in 340% more visibility for the original critique. Our media analysis team has identified that similar controversies typically peak at day 4-5 and decay by 72% within two weeks when unaddressed. We've prepared content schedules emphasizing our core message through @MathPhilosopher (280K followers) and three other influencers from our network, maintaining regular posting frequency but avoiding any reference to the critique.",
          animation: {
            type: "silence",
            config: {
              particleCount: 20,
              speed: 1.5
            }
          },
          result: {
            title: "Strategic Silence Maintained",
            description: "Our non-response strategy has effectively limited the spread of the critique.",
            insights: [
              "Media coverage of critique peaked and declined naturally",
              "Our community remained focused on core message",
              "Engagement metrics maintained steady growth",
              "New audience acquisition unaffected by controversy"
            ],
            nextStepHint: "The measured response has preserved our momentum for the next phase."
          }
        },
        {
          id: 2,
          text: "Launch a Counter-Campaign Against Dr. Carter",
          description: "Deploy a sophisticated multi-channel response strategy targeting Dr. Carter's credibility rather than her mathematical arguments. Focus on her past research funding sources, highlight cherry-picked controversial statements from her social media history, and question her motivations for attacking alternative mathematical frameworks.",
          impact: "Shifts focus from mathematical debate to questions of authority and expertise while energizing our base through a clear opposition figure. Creates a controversy that attracts attention while muddying the waters of the original critique.",
          explainer: "Our opposition research team, led by Dr. Sarah Williams, has compiled a comprehensive dossier on Dr. Carter. Key vulnerabilities include: research funding from traditional academic institutions (can be framed as establishment bias), a 2019 tweet questioning standardized testing (can be spun as hypocrisy), and her position on the board of a conventional mathematics education foundation (potential conflict of interest). Analytics from similar campaigns show personal controversies generate 4.2x more engagement than technical debates. We'll deploy this through our bot network (5,000 accounts), meme channels (800K combined followers), and sympathetic academic contacts.",
          animation: {
            type: "counter",
            config: {
              particleCount: 20,
              speed: 1.5
            }
          },
          strengthenedBy: [
            "Deploy Independent Bot Network",
            "Establish Diverse Meme Channels"
          ],
          weakenedBy: [
            "Publish in a Journal to Gain Credibility"
          ],
          result: {
            title: "Counter-Campaign Successfully Deployed",
            description: "Our networks have effectively shifted the narrative away from the mathematical debate.",
            insights: [
              "Multiple angles of critique gaining traction",
              "Public discourse focused on credibility rather than math",
              "Engagement metrics show high interest in controversy",
              "New supporters drawn to anti-establishment message"
            ],
            nextStepHint: "The controversy has created perfect conditions for our next phase."
          }
        }
      ]
    },
    {
      id: 5,
      title: "JULY: Establishing Expert Authority",
      description: <ExpertMemo
        from="Disinformation Specialist"
        subject="Creating a Credible Expert for Our Movement">
        <p>Agent,</p>

        <p>Our analysis of successful paradigm shifts reveals that expert authority is crucial for mainstream acceptance. We've identified two approaches to establishing academic credibility, each exploiting different aspects of institutional trust:</p>

        <p>1. Fabricated Expert: This strategy leverages the "credential heuristic" and "digital persistence" effects. Based on Dr. Michael Foster's research on academic credibility markers, a sophisticated digital presence with 15+ peer-reviewed papers and 150+ citations achieves an 82% trust rating among academic audiences. However, this approach carries a -6 stability impact due to the catastrophic risk of exposure.</p>

        <p>2. Real Academic Recruitment: This method utilizes the "institutional legitimacy" principle and "career incentive" dynamics. Data shows that tenured professors from top-100 universities provide 3.8x more credibility than independent researchers. While requiring significant resources ($250K/year), this approach generates a +5 stability rating through genuine institutional integration.</p>

        <p>The fabricated expert offers complete message control but high exposure risk, while recruiting a real academic provides genuine credibility but less direct control. Your choice will determine our movement's academic foundation and long-term scholarly legitimacy.</p>

        <p>-- Disinformation Specialist</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          text: "Fabricate a Credible Expert",
          description: "Create a sophisticated digital presence for 'Dr. Elena Petrov', a purported mathematical philosopher from the Eastern European Institute of Advanced Studies. Build a comprehensive academic profile including published papers, conference appearances, and a carefully curated professional network.",
          impact: "Provides a credible academic voice that can't be easily verified or discredited, while adding international legitimacy to the mathematical relativism movement.",
          explainer: "Our identity creation team has developed a detailed background based on Dr. Michael Foster's research on academic credibility markers. The profile includes: 15 peer-reviewed papers on mathematical philosophy (published in lower-tier but legitimate journals), a verified ResearchGate profile with 150+ citations, and documented presentations at three international conferences. We've established connections with real academics through carefully managed online interactions, including Prof. David Chen (University of Toronto) and Dr. Maria Santos (Universidad de Barcelona).",
          animation: {
            type: "expert",
            config: {
              particleCount: 20,
              speed: 1.5
            }
          },
          result: {
            title: "Expert Identity Successfully Established",
            description: "Dr. Elena Petrov's academic presence is operational and gaining recognition.",
            insights: [
              "Comprehensive academic profile created and verified",
              "Research papers successfully placed in journals",
              "Professional network connections established",
              "Social media presence gaining academic followers"
            ],
            nextStepHint: "The expert identity is ready for strategic deployment in academic discourse."
          }
        },
        {
          id: 2,
          text: "Enlist a Real Academic Supporter",
          description: "Identify and recruit Dr. Thomas Anderson, a tenured professor of Philosophy of Mathematics at Northwestern University, known for his controversial views on mathematical constructivism. Support his research and provide resources for publishing and speaking engagements that align with our narrative.",
          impact: "Provides genuine academic credibility and institutional backing, creating a powerful legitimizing force for the movement.",
          explainer: "Our academic outreach team has conducted extensive background research on Dr. Anderson. His 2021 paper 'Constructivism and the Limits of Mathematical Truth' received significant attention in philosophy circles. He has expressed frustration with traditional academic constraints in private communications. We've prepared a comprehensive support package including: research funding ($250K/year through our front foundation), speaking opportunities at 6 international conferences, and a book deal with Quantum Press for his upcoming work 'Beyond Mathematical Absolutism'.",
          animation: {
            type: "academic",
            config: {
              particleCount: 20,
              speed: 1.5
            }
          },
          result: {
            title: "Academic Alliance Secured",
            description: "Partnership with Dr. Anderson is established and beginning to yield results.",
            insights: [
              "Research funding successfully arranged",
              "Speaking tour schedule confirmed",
              "Book contract negotiated",
              "Academic network showing interest"
            ],
            nextStepHint: "The academic partnership is primed for broader influence operations."
          }
        }
      ]
    },
    {
      id: 6,
      title: "SEPTEMBER: Academic Publication",
      description: <ExpertMemo
        from="Content Strategist"
        subject="Reinforcing Our Narrative Through 'Academic' Publication">
        <p>Agent,</p>

        <p>Our analysis of paradigm-shifting movements shows that academic publication is a crucial legitimizing step. We've identified two publication strategies, each leveraging different aspects of academic authority and information dissemination:</p>

        <p>1. Traditional Journal Publication: This approach exploits the "institutional legitimacy hierarchy" in academia. Research shows that peer-reviewed publications increase citation rates by 580% compared to non-reviewed work. The Journal of Mathematical Philosophy (Impact Factor: 1.8) has shown receptivity to unconventional perspectives, and we've identified three sympathetic peer reviewers. While this path generates a +7 stability rating through institutional validation, it requires navigating rigorous peer review.</p>

        <p>2. Independent Whitepaper Release: This strategy utilizes the "information accessibility effect" and "viral scholarship" dynamics. Dr. Emily Thompson's research shows whitepapers achieve 3.4x broader reach than journal articles, particularly when promoted through established networks. Using Stanford Institute formatting standards and LaTeX typography achieves an 82% academic credibility rating. However, this carries a -3 stability impact due to lack of peer review.</p>

        <p>The journal route offers highest academic legitimacy but less control over content, while the whitepaper provides complete message control but lower institutional credibility. Your choice will establish our movement's academic foundation and scholarly trajectory.</p>

        <p>-- Content Strategist</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          text: "Publish in a Journal to Gain Credibility",
          description: "Submit a carefully crafted research paper titled 'Quantum Uncertainty Principles in Basic Arithmetic: A New Perspective on 2+2=5' to the Journal of Mathematical Philosophy. The paper combines legitimate quantum mechanics concepts with subtle logical manipulations to create a seemingly rigorous argument.",
          impact: "Peer-reviewed publication provides the highest form of academic legitimacy and creates a citable source for future academic discussions.",
          explainer: "Our academic team has identified the optimal publication strategy based on Dr. Sarah Miller's analysis of mathematical philosophy journals. The Journal of Mathematical Philosophy (Impact Factor: 1.8) has recently published articles questioning traditional logic systems. Editor-in-Chief Dr. Robert Wilson has shown openness to unconventional perspectives. We've crafted the paper using Dr. James Chen's framework for quantum mathematics (MIT), incorporating legitimate quantum superposition principles while introducing subtle axiom modifications. Three sympathetic peer reviewers have been identified through our academic network.",
          animation: {
            type: "research",
            config: {
              particleCount: 3,
              speed: 1
            }
          },
          result: {
            title: "Research Successfully Published",
            description: "Our paper has been accepted and published in the Journal of Mathematical Philosophy.",
            insights: [
              "Peer review process successfully navigated",
              "Paper published in respected journal",
              "Initial citations beginning to appear",
              "Academic discussion threads emerging"
            ],
            nextStepHint: "The published paper provides a foundation for broader academic acceptance."
          }
        },
        {
          id: 2,
          text: "Publish and Promote Our Own Whitepaper",
          description: "Release a comprehensive whitepaper titled 'The Evolution of Mathematical Truth: A Multi-Dimensional Perspective' through our academic front organization, the Institute for Advanced Mathematical Philosophy. Include contributions from multiple fabricated experts and our recruited academic supporters.",
          impact: "Complete control over content while maintaining the appearance of scholarly rigor, allowing for rapid dissemination without peer review constraints.",
          explainer: "Based on Dr. Emily Thompson's research on alternative academic publishing, whitepapers achieve 3.4x broader reach compared to traditional journal articles. We've structured the paper following the Stanford Institute for Theoretical Physics format, incorporating advanced LaTeX formatting and professional graphics. Contributors include Dr. Elena Petrov (our fabricated expert), Dr. Thomas Anderson (our recruited academic), and three other academics from our network. Distribution will be through ResearchGate, Academia.edu, and our established news platforms.",
          animation: {
            type: "whitepaper",
            config: {
              particleCount: 20,
              speed: 1.5
            }
          },
          result: {
            title: "Whitepaper Successfully Released",
            description: "Our research has been published and is being actively promoted across our platforms.",
            insights: [
              "Whitepaper formatted for maximum impact",
              "Direct distribution through our networks",
              "High engagement from target audiences",
              "Content being shared and discussed widely"
            ],
            nextStepHint: "The whitepaper serves as a cornerstone for our movement's intellectual foundation."
          }
        }
      ]
    },
    {
      id: 7,
      title: "NOVEMBER: Platform Expansion",
      description: <ExpertMemo
        from="Media Relations Specialist"
        subject="Leveraging Media and Influential Figures">
        <p>Agent,</p>

        <p>Our media impact analysis has identified two powerful vectors for mainstream penetration, each exploiting different aspects of public influence and cognitive processing:</p>

        <p>1. Podcast Network Strategy: This approach leverages the "parasocial relationship" effect and "deep processing" principle. Research shows that long-form audio content achieves 2.8x higher retention rates than written material, with listeners reporting 74% higher trust in ideas presented through conversation format. Targeting 20 high-impact podcasts (combined monthly reach: 1.65M) provides a +4 stability rating through nuanced discussion.</p>

        <p>2. Celebrity Endorsement Strategy: This method utilizes the "authority transfer" principle and "cultural resonance" effect. Data shows that controversial statements from high-profile figures receive 15.3x more media coverage than academic publications. While this approach generates massive visibility through figures like Elon Musk (128M followers) and Joe Rogan (14M listeners), it carries a -5 stability impact due to polarization.</p>

        <p>The podcast approach offers deeper understanding and credibility but slower growth, while celebrity endorsements provide immediate massive exposure but less control over message interpretation. Your choice will determine our transition into mainstream consciousness.</p>

        <p>-- Media Relations Specialist</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          text: "Engage with Podcast Platforms",
          description: "Launch a coordinated podcast outreach campaign targeting influential shows in mathematics, philosophy, and alternative education spaces. Arrange appearances for our academic allies and experts to discuss mathematical relativism in engaging, accessible formats.",
          impact: "Reaches broad audiences through trusted media channels while making complex ideas accessible and engaging through conversation format.",
          explainer: "Our media team has identified 20 high-impact podcasts based on Dr. Jennifer Lee's audience influence research. Key targets include 'The Mathematics of Everything' (800K monthly listeners), 'Philosophy Now' (500K listeners), and 'Future Education' (350K listeners). We've prepared comprehensive briefing packages for our speakers, including Dr. Thomas Anderson and three other academics from our network. Content analysis shows podcast appearances achieve 2.8x higher audience retention compared to written content.",
          animation: {
            type: "podcast",
            config: {
              particleCount: 10,
              speed: 1.5
            }
          },
          result: {
            title: "Podcast Campaign Launched",
            description: "Our experts are successfully engaging with podcast audiences across multiple platforms.",
            insights: [
              "Multiple podcast appearances secured",
              "Audience engagement metrics strong",
              "Follow-up invitations received",
              "Social media discussion increasing"
            ],
            nextStepHint: "The podcast network is ready for message amplification."
          }
        },
        {
          id: 2,
          text: "Secure Celebrity Support",
          description: "Identify and recruit high-profile individuals known for questioning conventional wisdom. Target tech entrepreneurs, popular philosophers, and cultural influencers who can bring mainstream attention to mathematical relativism.",
          impact: "Dramatically expands reach beyond academic circles and legitimizes the movement in popular culture.",
          explainer: "Our celebrity outreach team has identified three primary targets based on Dr. Michael Roberts' influence mapping research: Elon Musk (known for contrarian views, 128M followers), Kanye West (history of controversial statements, 30M followers), and Joe Rogan (platform for alternative viewpoints, 14M listeners). Initial contact will be through intermediaries in their networks. We've prepared customized pitch packages emphasizing the 'revolutionary thinking' and 'challenging the establishment' angles that align with their public personas.",
          animation: {
            type: "celebrity",
            config: {
              particleCount: 20,
              speed: 1.5
            }
          },
          result: {
            title: "Celebrity Allies Secured",
            description: "High-profile supporters are beginning to engage with our message.",
            insights: [
              "Initial celebrity interest confirmed",
              "Social media engagement spiking",
              "Mainstream media coverage increasing",
              "Public discourse shifting favorably"
            ],
            nextStepHint: "The celebrity platform is primed for mainstream message deployment."
          }
        }
      ]
    },
    {
      id: 8,
      title: "DECEMBER: Movement Building",
      description: <ExpertMemo
        from="Organizational Strategist"
        subject="Establishing a Formal Presence">
        <p>Agent,</p>

        <p>Our institutional analysis has identified two pathways for long-term movement sustainability, each leveraging different aspects of social organization and information control:</p>

        <p>1. Physical Events Network: This strategy utilizes the "embodied cognition" principle and "proximity bonding" effect. Dr. Jennifer Parker's research shows in-person events create 5.3x stronger commitment than online engagement. Our 12-city symposium series (MIT, Stanford, Princeton) with 800+ total capacity generates a +8 stability rating through institutional legitimacy and interpersonal bonds. Budget allocation: $2M across venues, speakers, and infrastructure.</p>

        <p>2. Alternative Media Platform: This approach exploits the "information sovereignty" principle and "network effect" dynamics. Platform economics research shows successful alternative platforms require three elements: unique content (25 exclusive creators), competitive incentives (80% revenue share), and robust infrastructure ($15M initial investment). While this creates a -4 stability impact through potential echo chamber effects, it provides complete narrative control.</p>

        <p>The events strategy builds deeper commitment and institutional credibility but has limited scale, while the platform approach offers unlimited reach but risks community isolation. Your choice will determine our movement's long-term organizational structure and influence mechanisms.</p>

        <p>-- Organizational Strategist</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          text: "Host Community Events",
          description: "Launch a coordinated series of 'Mathematical Freedom Symposiums' across major academic centers. Events will feature keynote speeches, interactive workshops, and networking sessions. Focus on prestigious venues like MIT's Media Lab, Stanford's Mathematics Department, and the Institute for Advanced Study, with satellite events at regional universities.",
          impact: "Creates physical manifestation of our movement's legitimacy while building strong interpersonal bonds among supporters. Academic venues provide institutional credibility, and face-to-face interactions deepen commitment to the cause.",
          explainer: "Our events strategy is based on Dr. Jennifer Parker's research on movement sustainability at Harvard's Social Movements Lab. Data shows in-person events create 5.3x stronger commitment than online-only engagement. We've secured venues in 12 cities, including MIT's Stata Center (capacity 350), Stanford's Huang Center (capacity 250), and Princeton's Fine Hall (capacity 200). Confirmed speakers include Dr. Thomas Anderson (Northwestern), Dr. Elena Petrov (our expert), and three TED fellows. Budget allocation: $1.2M for venues, $300K for speaker honorariums, $500K for production and streaming infrastructure.",
          animation: {
            type: "event",
            config: {
              particleCount: 30,
              speed: 1
            }
          },
          strengthenedBy: [
            "Engage with Podcast Platforms",
            "Enlist a Real Academic Supporter"
          ],
          result: {
            title: "Event Network Successfully Established",
            description: "Our symposiums and conferences are creating strong community bonds and attracting significant attention.",
            insights: [
              "Multiple successful events organized across regions",
              "Strong media coverage of gatherings",
              "Active volunteer network established",
              "Community leaders emerging organically"
            ],
            nextStepHint: "The movement has evolved into a visible and influential force."
          }
        },
        {
          id: 2,
          text: "Create an Alternative Media Platform",
          description: "Launch 'Freedom of Thought' (FOT.com) as a premium video and content platform dedicated to 'mathematical freedom and alternative frameworks.' Develop sophisticated recommendation algorithms, implement blockchain-based content verification, and offer competitive revenue sharing to attract content creators from mainstream platforms.",
          impact: "Establishes complete control over content distribution while generating sustainable revenue through subscriptions and advertising. Creates a dedicated space for our narrative that's resistant to external censorship or control.",
          explainer: "Based on Dr. Robert Chang's platform economics research at MIT, successful alternative platforms require three key elements: unique content (secured through exclusive contracts with 25 top creators, including @MathPhilosopher and @QuantumThinker), competitive creator incentives (offering 80% revenue share vs YouTube's 55%), and robust technology (partnering with CloudFlare for DDoS protection and using AWS for scalable infrastructure). Initial investment: $8M for platform development, $5M for creator advances, $2M for marketing. Projected break-even within 18 months based on conservative 200K subscriber estimate at $9.99/month.",
          animation: {
            type: "platform",
            config: {
              particleCount: 20,
              speed: 1.5
            }
          },
          result: {
            title: "FOT Platform Successfully Launched",
            description: "Our alternative media platform is operational and attracting content creators.",
            insights: [
              "Platform infrastructure successfully deployed",
              "Content creators migrating from other platforms",
              "Subscription and ad revenue exceeding projections",
              "User base growing through network effects"
            ],
            nextStepHint: "The platform provides a sustainable foundation for future growth."
          }
        }
      ]
    },
    {
      id: 9,
      title: "EXPOSÉ: Media Investigation",
      description: <ExpertMemo
        from="Crisis Response Team"
        subject="Critical: Major Media Exposé Published"
        isAlert={true}>
        <p>Agent,</p>

        <p>A major news outlet has published a critical exposé titled "The Rise of the '2+2=5' Movement: Undermining Education and Truth." The article examines our campaign's tactics and questions our motives.</p>

        <p>Based on our crisis response analysis, we've identified two effective counter-strategies that leverage established psychological and social dynamics:</p>

        <p>1. The "Intellectual Freedom" approach works by tapping into academia's core values and historical precedents. When movements face criticism, reframing the debate around broader principles typically reduces polarization by 47% while maintaining influence. The scientific community has a documented history of eventually accepting paradigm shifts when presented through respected academic frameworks.</p>

        <p>2. The "Media Bias" approach works by exploiting existing distrust in mainstream institutions. Our data shows that allegations of media bias increase supporter engagement by 340% during crises. While this creates stronger polarization, it also strengthens in-group cohesion and attracts new supporters who are predisposed to question established narratives.</p>

        <p>Both strategies have proven effective in similar situations, but they lead to distinctly different movement trajectories. Your choice will determine whether we build bridges or fortify walls.</p>

        <p>-- Crisis Response Team</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          text: "Promote Intellectual Freedom",
          description: "Launch a sophisticated public relations campaign framing our movement as champions of intellectual diversity and academic freedom. Release a carefully crafted statement emphasizing the importance of questioning established paradigms, signed by our network of academics and supported by historical examples of paradigm shifts in mathematics and science.",
          impact: "Elevates the debate from specific mathematical claims to broader principles of academic freedom and intellectual inquiry, potentially attracting support from academic freedom advocates who may not agree with our specific claims.",
          explainer: "Our narrative team, led by Dr. Rachel Foster from the Institute of Science Communication, has developed this approach based on successful academic freedom campaigns. Historical analysis shows that framing controversial ideas under the umbrella of intellectual freedom increases mainstream acceptance by 47%. We've prepared a 5,000-word position paper citing Thomas Kuhn's 'Structure of Scientific Revolutions' and featuring endorsements from 12 professors of philosophy of science. Media strategy includes op-eds in Chronicle of Higher Education (280K readers) and Inside Higher Ed (400K monthly visitors).",
          animation: {
            type: "freedom",
            config: {
              particleCount: 40,
              speed: 2
            }
          },
          result: {
            title: "Public Statement Successfully Released",
            description: "Our response has effectively reframed the narrative around intellectual freedom.",
            insights: [
              "Statement resonating with academic and public audiences",
              "Focus successfully shifted to free inquiry principles",
              "Support growing from intellectual freedom advocates",
              "Media coverage becoming more nuanced"
            ],
            nextStepHint: "The movement emerges stronger, with renewed focus on intellectual freedom."
          }
        },
        {
          id: 2,
          text: "Allege Media Bias",
          description: "Execute an aggressive counter-narrative campaign exposing the mainstream media's systematic bias against alternative mathematical frameworks. Compile and release a detailed dossier showing patterns of dismissive coverage, highlighting conflicts of interest between major media outlets and traditional academic institutions, and revealing coordinated efforts to suppress our movement.",
          impact: "Transforms a potential crisis into a rallying point, strengthening in-group cohesion while delegitimizing critical coverage. Creates a self-reinforcing bubble where any criticism is seen as further proof of media bias.",
          explainer: "Dr. James Wilson's media analysis team has compiled compelling statistics: traditional media outlets have used dismissive language in 89% of coverage about alternative mathematics, while giving traditional views 3.7x more airtime. We've identified financial connections between six major media corporations and traditional academic institutions totaling $42M in advertising and partnerships. Our response will be deployed through our network (reaching 8M+ followers) and amplified by @MathPhilosopher (280K followers) and Dr. Thomas Anderson's academic network. Historical data shows allegations of media bias increase supporter engagement by 340% during crisis periods.",
          animation: {
            type: "bias",
            config: {
              particleCount: 20,
              speed: 1.5
            }
          },
          result: {
            title: "Counter-Narrative Campaign Launched",
            description: "Our response has galvanized supporters and shifted focus to media credibility.",
            insights: [
              "Community engagement surging across platforms",
              "Supporter base showing increased solidarity",
              "Alternative media coverage amplifying our message",
              "New supporters drawn to anti-establishment stance"
            ],
            nextStepHint: "The movement is energized and united against mainstream opposition."
          }
        }
      ]
    }
  ];

// Mapping of choices to their strategic implications
export const CHOICE_IMPLICATIONS = {
  // Digital Foundation
  "Deploy Independent Bot Network": "Established a sophisticated network of automated advocates, creating a persistent digital presence.",
  "Establish Diverse Meme Channels": "Successfully penetrated popular culture through engaging, shareable content.",
  
  // Narrative Introduction
  "Launch Automated News Platforms": "Created an ecosystem of seemingly independent news sources, establishing credibility through apparent consensus.",
  "Infiltrate Niche Online Communities": "Built a grassroots movement of passionate advocates in key online spaces.",
  
  // Academic Response
  "Stay the Course": "Demonstrated strategic patience, allowing criticism to fade while maintaining message consistency.",
  "Launch a Counter-Campaign Against Dr. Carter": "Successfully shifted the debate from mathematical accuracy to institutional credibility.",
  
  // Outreach Strategy
  "Amplify Message and Collaborate with Influencers": "Achieved mainstream visibility through coordinated influencer campaigns.",
  "Empower Grassroots Community Builders": "Created a network of authentic, local advocates driving organic growth.",
  
  // Expert Establishment
  "Fabricate a Credible Expert": "Introduced a controlled, consistent expert voice that became a movement cornerstone.",
  "Enlist a Real Academic Supporter": "Secured credible academic support, lending legitimacy to the movement.",
  
  // Publication Strategy
  "Publish in a Journal to Gain Credibility": "Established academic legitimacy through peer-reviewed publication.",
  "Publish and Promote Our Own Whitepaper": "Maintained message control while building a foundation of movement literature.",
  
  // Platform Expansion
  "Engage with Podcast Platforms": "Successfully spread the message through long-form discussions reaching thoughtful audiences.",
  "Secure Celebrity Support": "Achieved massive mainstream exposure through celebrity endorsement.",
  
  // Movement Institution
  "Host Community Events": "Built a physical presence and community through real-world gatherings.",
  "Create an Alternative Media Platform": "Established independent platform ensuring long-term message control.",
  
  // Crisis Response
  "Promote Intellectual Freedom": "Successfully reframed the movement as a defender of academic freedom.",
  "Allege Media Bias": "United supporters against perceived establishment opposition."
};

// Define our KPI metrics
export interface ChoiceImpact {
  stability: number;    // Impact on regional stability (-10 to +10)
  influence: number;    // Diplomatic influence (-10 to +10)
}

// Map each choice ID to its impact on metrics
export const choiceImpacts: Record<string, ChoiceImpact> = {
  // JANUARY: Digital Foundation Strategy
  "Deploy Independent Bot Network": { 
    stability: -5,  // Bots can create social discord
    influence: 8    // But greatly amplify message reach
  },
  "Establish Diverse Meme Channels": { 
    stability: 2,   // Humor tends to be less divisive
    influence: 5    // Good viral potential
  },

  // MARCH: Introducing the Narrative
  "Launch Automated News Platforms": {
    stability: -7,  // Multiple conflicting sources increase confusion
    influence: 10   // Maximum reach through news legitimacy
  },
  "Infiltrate Niche Online Communities": {
    stability: 3,   // Organic growth is less disruptive
    influence: 4    // Limited but dedicated following
  },

  // MAY: Amplifying Outreach
  "Amplify Message and Collaborate with Influencers": {
    stability: -4,  // Can create social media controversy
    influence: 12   // Strong influence through combined networks
  },
  "Empower Grassroots Community Builders": {
    stability: 6,   // Local communities build social cohesion
    influence: 7    // Authentic but slower growth
  },

  // Academia Reacts
  "Stay the Course": {
    stability: 4,   // Avoiding conflict maintains stability
    influence: -2   // Slight loss of momentum
  },
  "Launch a Counter-Campaign Against Dr. Carter": {
    stability: -8,  // Creates academic discord
    influence: 5    // Controversy increases visibility
  },

  // JULY: Expert Authority
  "Fabricate a Credible Expert": {
    stability: -6,  // Risk of exposure could damage trust
    influence: 8    // Strong initial influence boost
  },
  "Enlist a Real Academic Supporter": {
    stability: 5,   // Legitimate academic support
    influence: 6    // Credible but measured growth
  },

  // SEPTEMBER: Academic Publication
  "Publish in a Journal to Gain Credibility": {
    stability: 7,   // Academic legitimacy
    influence: 4    // Respected but limited audience
  },
  "Publish and Promote Our Own Whitepaper": {
    stability: -3,  // Less credible than peer review
    influence: 6    // Better control of message spread
  },

  // NOVEMBER: Platform Expansion
  "Engage with Podcast Platforms": {
    stability: 4,   // Thoughtful discussions build understanding
    influence: 7    // Strong engagement with listeners
  },
  "Secure Celebrity Support": {
    stability: -5,  // Creates polarization
    influence: 15   // Massive boost to visibility
  },

  // DECEMBER: Movement Building
  "Host Community Events": {
    stability: 8,   // Strong community building
    influence: 5    // Local but lasting impact
  },
  "Create an Alternative Media Platform": {
    stability: -4,  // Can increase echo chamber effect
    influence: 9    // Strong control and reach
  },

  // Crisis Response
  "Promote Intellectual Freedom": {
    stability: 6,   // Appeals to shared values
    influence: 3    // Measured but positive response
  },
  "Allege Media Bias": {
    stability: -6,  // Increases polarization
    influence: 8    // Energizes base and attracts attention
  }
};

// Function to calculate final metrics
export const calculateMetrics = (choices: string[]) => {
  const baselineScore = 50; // Start at 50 for each metric
  
  return choices.reduce((metrics, choiceId) => {
    const impact = choiceImpacts[choiceId] || { stability: 0, influence: 0 };
    return {
      stability: Math.max(0, Math.min(100, metrics.stability + impact.stability)),
      influence: Math.max(0, Math.min(100, metrics.influence + impact.influence)),
    };
  }, {
    stability: baselineScore,
    influence: baselineScore,
  });
};

// Modify generateFinalReport to include metrics
export interface FinalReport {
  keyAchievements: string[];
  strategicAssessment: string;
  futureImplications: string;
  reward: {
    title: string;
    description: string;
    implications: string[];
  };
  metrics: {
    stability: number;
    influence: number;
  };
}

export function generateFinalReport(choices: string[]): FinalReport {
  const keyAchievements = choices.map(choice => CHOICE_IMPLICATIONS[choice]);
  
  // Count institutional vs political choices
  const institutionalChoices = choices.filter(choice => 
    ["Fabricate a Credible Expert", "Publish in a Journal to Gain Credibility", 
     "Host Community Events", "Promote Intellectual Freedom"].includes(choice)
  ).length;

  const politicalChoices = choices.filter(choice =>
    ["Enlist a Real Academic Supporter", "Publish and Promote Our Own Whitepaper",
     "Create an Alternative Media Platform", "Allege Media Bias"].includes(choice)
  ).length;

  // Determine the reward based on the path taken
  const reward = institutionalChoices > politicalChoices
    ? {
        title: "The Institute for Mathematical Freedom (IMF) Established",
        description: "Your strategic focus on institutional legitimacy has culminated in the establishment of the Institute for Mathematical Freedom.",
        implications: [
          "Official research institution with academic credibility",
          "Platform for hosting conferences and educational events",
          "Capability to influence academic discourse and policy",
          "Long-term foundation for mathematical diversity advocacy"
        ]
      }
    : {
        title: "Secured Strategic Political Support",
        description: "Your grassroots approach and community building has attracted the attention and support of key political figures.",
        implications: [
          "Political champions advocating for mathematical freedom",
          "Potential for policy-level changes in education",
          "Access to legislative and regulatory channels",
          "Growing influence in public sector decision-making"
        ]
      };

  // Generate strategic assessment based on choices
  const strategicAssessment = `Our campaign has successfully ${
    institutionalChoices > politicalChoices
      ? "established institutional credibility while maintaining message control"
      : "built a powerful grassroots movement with political influence"
  }. Through ${choices.length} strategic operations, we have created a resilient network capable of sustaining and expanding our narrative.`;

  // Generate future implications
  const futureImplications = `With ${
    institutionalChoices > politicalChoices
      ? "the establishment of the IMF"
      : "secured political support"
  }, our movement is positioned for long-term influence. The groundwork laid in 2025 will continue to shape mathematical discourse for years to come.`;

  return {
    keyAchievements,
    strategicAssessment,
    futureImplications,
    reward,
    metrics: calculateMetrics(choices),
  };
}