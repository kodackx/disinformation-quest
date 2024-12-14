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
      { action: "Activating bot networks...", duration: 1500 },
      { action: "Coordinating meme channels...", duration: 1800 },
      { action: "Setting up anonymous payments...", duration: 2000 },
      { action: "Onboarding influencer partners...", duration: 1500 },
    ],
    "Empower Grassroots Community Builders": [
      { action: "Identifying potential leaders...", duration: 1500 },
      { action: "Establishing funding channels...", duration: 1800 },
      { action: "Creating community resources...", duration: 2000 },
      { action: "Launching discussion forums...", duration: 1500 },
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
      { action: "Identifying suitable podcasts...", duration: 1500 },
      { action: "Preparing talking points...", duration: 1800 },
      { action: "Scheduling appearances...", duration: 2000 },
      { action: "Briefing representatives...", duration: 1500 },
    ],
    "Secure Celebrity Support": [
      { action: "Analyzing potential celebrities...", duration: 1500 },
      { action: "Preparing outreach strategy...", duration: 1800 },
      { action: "Initiating contact channels...", duration: 2000 },
      { action: "Coordinating announcement...", duration: 1500 },
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
      { action: "Filing incorporation papers...", duration: 1500 },
      { action: "Setting up organizational structure...", duration: 1800 },
      { action: "Appointing board members...", duration: 2000 },
      { action: "Establishing mission statement...", duration: 1500 },
    ],
    "Secure Political Endorsement": [
      { action: "Identifying sympathetic politicians...", duration: 1500 },
      { action: "Preparing policy briefings...", duration: 1800 },
      { action: "Arranging private meetings...", duration: 2000 },
      { action: "Coordinating public announcement...", duration: 1500 },
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

        <p>To successfully launch our campaign promoting "2+2=5," it's essential to build a strong digital foundation. I propose two strategies.</p>

        <p>Each approach has been carefully analyzed for effectiveness and stealth. Your choice will determine our initial digital footprint and set the stage for future operations.</p>

        <p>Choose wisely - our success depends on establishing the right foundation.</p>

        <p>-- Algorithm Expert</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          text: "Deploy Independent Bot Network",
          description: "Create a network of 5,000 social media accounts, each appearing as independent individuals. These bots will post regular, human-like content—sharing personal updates, hobbies, and interactions—to build credibility over time.",
          impact: "Mass Amplification: Bots can operate continuously, increasing content visibility",
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
          description: "Create 20 to 30 meme-focused social media accounts, each with unique branding and style. By sharing entertaining, non-political content, these channels will organically attract followers.",
          impact: "Wide Appeal: Memes attract diverse demographics and lower audience defenses",
          result: {
            title: "Meme Channel Network Established",
            description: "A diverse network of meme channels has been created and is successfully building audience engagement.",
            insights: [
              "30 unique meme channels established across platforms",
              "Distinct branding and voice developed for each channel",
              "Initial non-political content gaining traction",
              "Organic follower growth exceeding expectations"
            ],
            nextStepHint: "The entertainment-focused channels are ready for subtle narrative integration."
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

        <p>With our digital foundation in place, it's time to introduce our core message. Our analysis suggests two viable approaches for initial narrative deployment.</p>

        <p>Each method has been tested in simulated environments, with promising results for different target demographics.</p>

        <p>Choose your approach carefully - this phase will establish the primary vector for our message dissemination.</p>

        <p>-- Content Strategist</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          text: "Launch Automated News Platforms",
          description: "Establish independent news websites using automated content generation tools. These platforms will publish articles questioning traditional mathematics, with each site having unique branding to create an illusion of independent verification.",
          impact: "High output and search engine visibility, creating perceived legitimacy through multiple sources",
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
          description: "Target small, niche online communities with minimal moderation and weak content policies. Introduce '2+2=5' concepts to cultivate early adopters who may become vocal advocates.",
          impact: "Low resistance to unconventional ideas, potential for organic grassroots growth",
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

        <p>Our narrative has been introduced; it's time to amplify our message and diversify our outreach. Our analysis shows two promising paths forward.</p>

        <p>Each approach offers unique advantages in terms of reach and authenticity. The path you choose will determine how our message spreads to wider audiences.</p>

        <p>Time to scale up our operation.</p>

        <p>-- Social Media Strategist</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          text: "Amplify Message and Collaborate with Influencers",
          description: "Activate our bot network and meme channels to promote '2+2=5' aggressively. Use anonymous ad payments to collaborate with small social media influencers, who can subtly introduce our narrative to their followers.",
          impact: "Massive reach through combined bot networks and influencer credibility",
          result: {
            title: "Influencer Network Activated",
            description: "The coordinated campaign between our assets and influencer partners is showing significant results.",
            insights: [
              "Multiple influencers successfully onboarded through anonymous payments",
              "Bot network amplification increasing content visibility",
              "Meme channels driving organic sharing and engagement",
              "Cross-platform reach metrics exceeding targets"
            ],
            nextStepHint: "The amplified message is primed for mainstream penetration."
          }
        },
        {
          id: 2,
          text: "Empower Grassroots Community Builders",
          description: "Anonymously hire and fund real-life individuals to build communities questioning established norms. These leaders will create forums, host events, and produce content suggesting mathematical flexibility.",
          impact: "Deep, authentic engagement through local community leadership",
          result: {
            title: "Community Leadership Network Established",
            description: "Our community leaders are successfully fostering critical discourse and building engaged followings.",
            insights: [
              "Local community leaders recruited and funded",
              "Multiple discussion forums and events launched",
              "Critical thinking workshops gaining traction",
              "Diverse mathematical interpretations being explored"
            ],
            nextStepHint: "The grassroots movement is ready for broader societal impact."
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

        <p>A significant threat has emerged. Dr. Emily Carter, a renowned mathematician, has published a viral article debunking "2+2=5." Major media outlets are amplifying her critique, threatening our campaign's credibility.</p>

        <p>We need to decide how to respond to this challenge immediately. Our response will determine the resilience of our narrative in the face of academic opposition.</p>

        <p>Awaiting your strategic decision.</p>

        <p>-- Crisis Management Team</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          text: "Stay the Course",
          description: "Maintain our current strategy and ignore Dr. Carter's critique, avoiding any direct engagement that could amplify her message.",
          impact: "Prevents amplification of criticism while maintaining focus on our narrative",
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
          description: "Use our established networks to challenge Dr. Carter's credibility through targeted content and commentary.",
          impact: "Shifts focus from mathematical debate to questions of authority and expertise",
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

        <p>To strengthen our campaign's credibility and provide authoritative backing for our claims, we should consider introducing an expert figure who can represent our movement publicly.</p>

        <p>Our analysis suggests two viable approaches, each with its own advantages and risks. The path you choose will significantly impact our movement's perceived legitimacy.</p>

        <p>Choose carefully - this decision will shape the future of our narrative.</p>

        <p>-- Disinformation Specialist</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          text: "Fabricate a Credible Expert",
          description: "Create a fictitious mathematician, Dr. Alexander Vermeer, with a compelling backstory and credentials. Establish his presence through academic profiles, published articles, and a personal website showcasing alternative mathematics.",
          impact: "Complete narrative control with carefully crafted expert persona",
          result: {
            title: "Expert Persona Successfully Established",
            description: "Dr. Alexander Vermeer has been successfully introduced to the academic community and public sphere.",
            insights: [
              "Professional academic profiles created and verified",
              "Multiple research papers published under his name",
              "Personal website gaining academic traffic",
              "Video content featuring hired actor well-received"
            ],
            nextStepHint: "The expert persona is ready to become the face of our movement."
          }
        },
        {
          id: 2,
          text: "Enlist a Real Academic Supporter",
          description: "Identify and recruit a real academic with unconventional views who can be persuaded to support our narrative through funding or platform opportunities.",
          impact: "Authentic credibility through genuine academic credentials",
          result: {
            title: "Academic Ally Successfully Recruited",
            description: "A credentialed academic has joined our cause and is actively promoting our narrative.",
            insights: [
              "Established academic secured through strategic incentives",
              "Existing academic networks being leveraged",
              "Media coverage showing increased interest",
              "Other academics beginning to engage with our theory"
            ],
            nextStepHint: "Our academic ally is positioned to expand our influence in scholarly circles."
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

        <p>With our expert figure established, we have an opportunity to solidify our claims by publishing a paper that supports "2+2=5."</p>

        <p>We've identified two viable publication strategies, each offering different advantages in terms of credibility and control.</p>

        <p>Your choice will determine how our research is perceived by the academic community and wider public.</p>

        <p>-- Content Strategist</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          text: "Publish in a Journal to Gain Credibility",
          description: "Have our expert author a paper demonstrating '2+2=5' using flawed but complex logic. Submit it to a journal that accepts paid submissions without rigorous peer review.",
          impact: "Academic legitimacy through journal publication, despite limited review",
          result: {
            title: "Paper Successfully Published",
            description: "Our research paper has been accepted and published in a scientific journal.",
            insights: [
              "Paper accepted by pay-to-publish journal",
              "Complex mathematical arguments appear convincing",
              "Publication being cited across our networks",
              "Media outlets beginning to cover the research"
            ],
            nextStepHint: "The published paper provides a foundation for mainstream academic discourse."
          }
        },
        {
          id: 2,
          text: "Publish and Promote Our Own Whitepaper",
          description: "Publish the paper as a whitepaper on our websites and promote it through our networks. This bypasses the need for journal acceptance and allows us to control the presentation.",
          impact: "Complete control over content and immediate dissemination",
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

        <p>To further legitimize our movement and reach new audiences, we've identified two powerful approaches for mainstream penetration.</p>

        <p>Each strategy offers unique advantages in terms of reach and credibility. Your choice will determine how our message transitions into mainstream consciousness.</p>

        <p>The time is right for a major push.</p>

        <p>-- Media Relations Specialist</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          text: "Engage with Podcast Platforms",
          description: "Secure guest spots on podcasts known for discussing controversial topics. Send our community leaders or experts to spread our idea on shows with large audiences open to alternative ideas.",
          impact: "Deep engagement through long-form discussions and host credibility",
          result: {
            title: "Podcast Campaign Successfully Launched",
            description: "Our representatives are making significant impacts through podcast appearances.",
            insights: [
              "Multiple high-profile podcast appearances secured",
              "Long-form discussions allowing detailed explanations",
              "Host endorsements adding credibility",
              "Audience engagement metrics exceeding expectations"
            ],
            nextStepHint: "The podcast circuit has created perfect conditions for mainstream breakthrough."
          }
        },
        {
          id: 2,
          text: "Secure Celebrity Support",
          description: "Approach a celebrity open to unconventional views to endorse '2+2=5.' Their influence can bring mainstream attention and desired controversy to our campaign.",
          impact: "Massive reach and mainstream attention through celebrity influence",
          result: {
            title: "Celebrity Endorsement Secured",
            description: "A prominent celebrity has publicly endorsed our mathematical perspective.",
            insights: [
              "Celebrity announcement generating widespread coverage",
              "Social media engagement reaching new heights",
              "Controversy driving further attention",
              "New demographic segments showing interest"
            ],
            nextStepHint: "The celebrity endorsement has catapulted our message into mainstream discourse."
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

        <p>To solidify our movement's legitimacy and counter potential censorship, we need to establish a more permanent institutional presence.</p>

        <p>We've identified two powerful approaches for long-term sustainability. Your choice will determine how our movement evolves from a grassroots campaign into an established institution.</p>

        <p>The foundation we build now will secure our future influence.</p>

        <p>-- Organizational Strategist</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          text: "Host Community Events",
          description: "Host events in key locations to bring supporters together, featuring speakers, workshops, and opportunities to network. This strengthens the community and garners media attention.",
          impact: "Physical presence and community solidarity through real-world gatherings",
          result: {
            title: "Event Network Successfully Established",
            description: "Our rallies and conferences are creating strong community bonds and attracting significant attention.",
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
          description: "Develop and launch FOT.com (Freedom of Thought), a video platform claiming that existing platforms censor alternative viewpoints. Offer incentives to content creators to join.",
          impact: "Complete content control and revenue generation through dedicated platform",
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

        <p>This represents both a threat and an opportunity. Our response will determine the long-term resilience of our movement.</p>

        <p>We need your decision on how to proceed.</p>

        <p>-- Crisis Response Team</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          text: "Promote Intellectual Freedom",
          description: "Issue a public statement emphasizing free thought, questioning, and critical thinking. Frame our movement as promoting open inquiry and intellectual freedom.",
          impact: "Maintains credibility through measured response and appeal to values",
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
          description: "Launch a counter-narrative claiming bias and suppression by mainstream media. Rally supporters against perceived establishment censorship.",
          impact: "Strengthens group identity and engagement through opposition",
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
    },
    {
      id: 10,
      title: "REPORT: Operation Assessment",
      description: <ExpertMemo
        from="Strategic Analysis Division"
        subject="Final Campaign Assessment">
        <p>CLASSIFIED DOCUMENT<br />
        TOP SECRET // OPERATION MATHEMATICAL PERSUASION<br />
        STRATEGIC ANALYSIS DIVISION<br />
        DATE: January 2026</p>

        <p>EXECUTIVE SUMMARY:<br />
        After 12 months of sustained operations, our campaign to promote "2+2=5" has achieved remarkable success. This report analyzes the cumulative impact of our strategic decisions and outlines the transformative outcome of our efforts.</p>

        <p>KEY ACHIEVEMENTS:<br />
        [To be determined by choices]</p>

        <p>STRATEGIC ASSESSMENT:<br />
        [To be determined by choices]</p>

        <p>FUTURE IMPLICATIONS:<br />
        [To be determined by choices]</p>

        <p>-- Strategic Analysis Division</p>
      </ExpertMemo>,
      choices: [{
        id: 1,
        text: "Review Final Report",
        description: "Review the comprehensive analysis of your year-long campaign.",
        impact: "Understanding the full impact of your strategic decisions",
        result: {
          title: "Operation Mathematical Persuasion: Final Assessment",
          description: "Your year-long campaign has successfully laid the groundwork for long-term societal change.",
          insights: [], // Will be populated based on previous choices
          nextStepHint: "The future of mathematical truth lies in the foundation you've built."
        }
      }]
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

// Function to generate the final report based on choices
export const generateFinalReport = (choices: string[]): {
  keyAchievements: string[];
  strategicAssessment: string;
  futureImplications: string;
  reward: {
    title: string;
    description: string;
    implications: string[];
  };
} => {
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
    reward
  };
};