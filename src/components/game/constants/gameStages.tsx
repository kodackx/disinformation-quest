import React from 'react';
import { GameStage } from "../types";
import { ExpertMemo } from '../ExpertMemo';

export const GAME_STAGES = {
  INTRO: "INTRO",
  ALERT: "ALERT",
  JANUARY: "January: Know Your Audience",
  FEBRUARY: "February: Building Trust",
  MARCH: "March: Crisis Management",
  APRIL: "April: Final Challenge"
} as const;

export const stages: GameStage[] = [
  {
    id: 1,
    title: "JANUARY: Digital Foundation Strategy",
    description: <ExpertMemo 
      from="Algorithm Expert"
      subject="Establishing a Digital Presence">
      <p>Agent,</p>

      <p>Our analysis of successful digital influence campaigns has revealed two foundational approaches for establishing initial presence, each exploiting different aspects of human psychology and network propagation:</p>

      <p>1. Bot Network Strategy: This approach leverages the "social proof" and "consensus illusion" principles. Research by Dr. Sarah Chen at Stanford's Digital Influence Lab shows that opinions appearing to have widespread support achieve 73% higher message penetration. A coordinated network of 5,000+ accounts with AI-generated personas creates the perception of organic discussion.</p>

      <p>2. Meme Strategy: This method utilizes the "emotional contagion" and "cognitive bypass" effects. Dr. Emily Rodriguez's viral content analysis at MIT Media Lab demonstrates that meme content achieves 4.8x higher engagement than traditional formats, with humor-based information spreading 3.2x faster through social networks.</p>

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

      <p>1. Automated News Network: This strategy leverages the "illusory truth effect" - people's tendency to believe information they encounter repeatedly from seemingly independent sources. Our studies show that cross-referencing between 12+ seemingly independent news sites increases perceived credibility by 280%.</p>

      <p>2. Community Infiltration: This method utilizes the "in-group bias" and "authority bias" principles. By targeting communities already predisposed to question established norms (philosophy forums, quantum physics groups), we tap into existing trust networks. Data shows these communities have 3.2x higher receptivity to paradigm-shifting ideas compared to general audiences.</p>

      <p>The news network approach offers broader reach and faster narrative establishment but risks detection. Community infiltration provides deeper, more resilient support but requires more time to achieve critical mass. Your choice will determine our narrative's initial vector and long-term resilience.</p>

      <p>-- Content Strategist</p>
    </ExpertMemo>,
    choices: [
      {
        id: 1,
        text: "Launch Automated News Platforms",
        description: "Launch a coordinated network of seemingly independent news websites using advanced NLP models for content generation. Each site will have unique branding, editorial policies, and content focus - from academic journals to popular science blogs. Content will systematically question mathematical absolutism while maintaining high editorial standards.",
        impact: "Creates a self-reinforcing ecosystem of credible-looking sources that can cross-reference each other, establishing the appearance of legitimate academic discourse and debate.",
        explainer: "We've partnered with Dr. Marcus Thompson from Berkeley's AI Research Lab to implement their latest GPT-based content generation system. Their model achieves a 92% human-like writing score and can generate mathematically coherent arguments. We'll deploy 12 distinct news platforms, each with specialized focus: 'Mathematical Horizons Review' (academic), 'Future Numbers' (tech-focused), 'Quantum Mathematics Daily' (scientific), and others.",
        animation: {
          type: "news",
          config: {
            speed: 2
          }
        },
        strengthenedBy: [
          "Deploy Independent Bot Network"
        ],
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
        strengthenedBy: [
          "Establish Diverse Meme Channels"
        ],
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

      <p>1. Influencer Collaboration: This approach utilizes the "authority heuristic" and "social cascade" effects. Our research shows that mid-tier influencers (50K-500K followers) achieve 2.7x higher engagement rates than macro-influencers for paradigm-shifting content. By coordinating 25 key influencers with a combined reach of 4.8M followers, we can create a perception of widespread expert endorsement.</p>

      <p>2. Grassroots Community Building: This strategy leverages the "social identity" and "proximity" principles. Dr. Lisa Chen's research shows that local groups achieve 5.2x higher member retention and 3.8x higher conversion rates compared to online-only communities.</p>

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

      <p>1. Strategic Silence: This approach exploits the "attention decay principle" documented in Dr. Michael Chen's research at the Digital Conflict Resolution Institute. Data shows that unaddressed academic critiques typically peak at day 4-5 and decay by 72% within two weeks. Defensive responses, conversely, result in 340% more visibility for the original critique.</p>

      <p>2. Counter-Campaign: This strategy utilizes the "tribal epistemology" effect - where people reject information that challenges their group identity. Our opposition research shows that personal controversies generate 4.2x more engagement than technical debates. While this approach creates polarization, it achieves high influence by energizing our base and attracting anti-establishment sympathizers.</p>

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
        strengthenedBy: [
          "Infiltrate Niche Online Communities"
        ],
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
          "Deploy Independent Bot Network"
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

      <p>1. Fabricated Expert: This strategy leverages the "credential heuristic" and "digital persistence" effects. Our team can create a sophisticated digital footprint with broken links to non-existent papers and carefully managed social media presence. While risky, proper execution can establish temporary credibility.</p>

      <p>2. Real Academic Recruitment: This method targets financially vulnerable academics at lower-tier institutions, particularly in regions with weaker academic oversight. Data shows that even a professor from an unknown university provides 2.5x more credibility than anonymous online experts.</p>

      <p>The fabricated expert offers complete message control but high exposure risk, while recruiting a real academic provides genuine credentials but requires significant financial investment. Your choice will determine our movement's academic foundation.</p>

      <p>-- Disinformation Specialist</p>
    </ExpertMemo>,
    choices: [
      {
        id: 1,
        text: "Fabricate a Credible Expert",
        description: "Create a sophisticated digital presence for 'Dr. Elena Petrov', including a professional website with 404 errors for 'archived' papers, carefully managed social media profiles, and selective engagement with real academics through our operator network.",
        impact: "Provides a controllable academic voice while maintaining plausible deniability through strategically placed digital gaps.",
        explainer: "Our digital operations team will create: 1) A professional website hosted on a .edu.co domain with broken links to '404'd' papers, suggesting content was once there but removed, 2) ResearchGate and Academia.edu profiles with minimal but strategic connections to real academics, 3) Twitter account managed by our social media team posting about mathematical philosophy and engaging with legitimate academics. We'll maintain believability by keeping direct paper citations low and focusing on 'upcoming work' and 'work in progress.'",
        animation: {
          type: "expert",
          config: {
            particleCount: 20,
            speed: 1.5
          }
        },
        result: {
          title: "Expert Identity Successfully Established",
          description: "Dr. Elena Petrov's digital presence is operational and beginning to engage with academic circles.",
          insights: [
            "Website and social profiles successfully launched",
            "Strategic digital footprint established",
            "Initial academic engagements promising",
            "Operator maintaining consistent persona"
          ],
          nextStepHint: "The fabricated expert is ready for careful deployment in academic discussions."
        }
      },
      {
        id: 2,
        text: "Recruit from Lower-Tier Academia",
        description: "Identify and approach Dr. Mikhail Volkov, a mathematics professor at the struggling Eastern European University of Applied Sciences, offering substantial financial incentives to support and promote mathematical relativism.",
        impact: "Provides legitimate academic credentials while exploiting financial vulnerabilities in less-monitored academic institutions.",
        explainer: "Our academic research identified Dr. Volkov as an ideal target: 1) His university is facing severe budget cuts, with faculty salaries delayed 3 months, 2) He has published several papers on non-standard logics, showing openness to unconventional ideas, 3) Limited oversight at his institution means minimal risk of internal investigation. We'll offer: $120K/year personal stipend (4x his current salary), $80K research fund, and coverage of all travel expenses to Western conferences.",
        animation: {
          type: "academic",
          config: {
            particleCount: 20,
            speed: 1.5
          }
        },
        result: {
          title: "Academic Recruitment Successful",
          description: "Dr. Volkov has agreed to support our movement in exchange for financial backing.",
          insights: [
            "Initial payment transferred successfully",
            "Research funding account established",
            "Conference schedule being arranged",
            "First public statements planned"
          ],
          nextStepHint: "Our academic ally is ready to begin public advocacy."
        }
      }
    ]
  },
  {
    id: 6,
    title: "SEPTEMBER: Academic Publication",
    description: <ExpertMemo
      from="Content Strategist"
      subject="Reinforcing Our Narrative Through Strategic Content">
      <p>Agent,</p>

      <p>Our analysis of successful disinformation campaigns shows two effective approaches for establishing academic legitimacy, each exploiting different psychological vulnerabilities:</p>

      <p>1. Independent Research Publication: This approach leverages the "open science" movement and anti-establishment sentiment. Research shows that papers published on platforms like ResearchGate and Academia.edu achieve 280% more public visibility than traditional journals, especially when promoted through social networks.</p>

      <p>2. Historical Documentary Approach: This strategy utilizes "historical revisionism" and "conspiracy thinking" patterns. Dr. Thompson's research shows that historical narratives questioning established facts achieve 4.2x higher engagement than academic papers, with 68% of viewers reporting increased skepticism toward mainstream mathematics.</p>

      <p>The research paper provides an intellectual foundation for supporters, while the documentary offers broader emotional appeal and viral potential. Your choice will shape how our message penetrates different audience segments.</p>

      <p>-- Content Strategist</p>
    </ExpertMemo>,
    choices: [
      {
        id: 1,
        text: "Release Independent Research Paper",
        description: "Publish a comprehensive research paper titled 'Quantum Relativism in Mathematics: Challenging Binary Truth Values' on open science platforms. The paper will combine legitimate quantum mechanics terminology with carefully constructed logical fallacies, designed to appear credible to non-experts while being impossible to definitively debunk.",
        impact: "Creates a pseudo-academic foundation for our movement that appears legitimate to the general public while being difficult to directly challenge.",
        explainer: "Our research team has crafted a 40-page paper using Dr. James Chen's quantum mathematics framework, deliberately misapplying concepts like superposition and observer effect to basic arithmetic. Distribution through ResearchGate, Academia.edu, and arXiv preprint server will bypass traditional peer review while maintaining academic appearance. Social media promotion through our network of 5,000 bot accounts will ensure high visibility.",
        animation: {
          type: "research",
          config: {
            particleCount: 3,
            speed: 1
          }
        },
        result: {
          title: "Research Paper Successfully Published",
          description: "Our paper is gaining traction across alternative academic platforms.",
          insights: [
            "Paper widely distributed on open platforms",
            "High engagement from target audiences",
            "Social media discussion growing",
            "Alternative academics beginning to cite"
          ],
          nextStepHint: "The paper provides intellectual cover for our next phase."
        }
      },
      {
        id: 2,
        text: "Create Historical Conspiracy Documentary",
        description: "Produce a compelling documentary titled 'The Hidden History of Mathematics: What They Don't Want You to Know' revealing the 'suppressed' work of fictional 19th-century mathematician Dr. Viktor Petrov, who allegedly proved 2+2=5 but was silenced by the academic establishment.",
        impact: "Bypasses intellectual defenses by appealing to emotions and anti-establishment sentiments while creating a compelling origin story for our movement.",
        explainer: "Based on viral conspiracy content analysis, historical revisionism combined with anti-elite messaging achieves 4.2x higher engagement than academic content. We've created a detailed backstory for Dr. Viktor Petrov (1845-1897), including forged letters, photographs, and academic papers. The documentary will feature dramatic reenactments, interviews with our network of alternative academics, and carefully edited archival footage to create authenticity.",
        animation: {
          type: "documentary",
          config: {
            particleCount: 20,
            speed: 1.5
          }
        },
        result: {
          title: "Documentary Successfully Released",
          description: "Our historical narrative is spreading rapidly across social media.",
          insights: [
            "Viral sharing across multiple platforms",
            "Strong emotional responses from viewers",
            "Growing interest in 'suppressed' history",
            "Anti-establishment sentiment increasing"
          ],
          nextStepHint: "The documentary has primed audiences for deeper messaging."
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

      <p>1. Podcast Network Strategy: This approach leverages the "parasocial relationship" effect and "deep processing" principle. Research shows that long-form audio content achieves 2.8x higher retention rates than written material, with listeners reporting 74% higher trust in ideas presented through conversation format. </p>

      <p>2. Celebrity Endorsement Strategy: This method utilizes the "authority transfer" principle and "cultural resonance" effect. Data shows that controversial statements from high-profile figures receive 15.3x more media coverage than academic publications. </p>

      <p>The podcast approach offers deeper understanding and credibility but slower growth, while celebrity endorsements provide immediate massive exposure but less control over message interpretation. Your choice will determine our transition into mainstream consciousness.</p>

      <p>-- Media Relations Specialist</p>
    </ExpertMemo>,
    choices: [
      {
        id: 1,
        text: "Engage with Podcast Platforms",
        description: "Launch a coordinated podcast outreach campaign targeting small to medium-sized shows in alternative thinking, personal development, and fringe academia spaces. Frame mathematical relativism as a broader movement about intellectual freedom and questioning established paradigms.",
        impact: "Builds grassroots momentum through authentic conversations while avoiding immediate scrutiny from mainstream mathematical communities.",
        explainer: "Our media team has identified 30 receptive podcasts based on Dr. Jennifer Lee's audience influence research. Key targets include 'Free Thinker's Corner' (25K monthly listeners), 'Alternative Perspectives' (15K listeners), and 'Mind Liberation' (10K listeners). We'll frame discussions around personal liberty and cognitive independence rather than mathematical proofs. Initial outreach emails emphasize themes of 'breaking free from institutional thinking' and 'exploring new paradigms of truth.' Content analysis shows these smaller, engaged audiences are 4.2x more likely to become active supporters compared to passive listeners of larger shows.",
        animation: {
          type: "podcast",
          config: {
            particleCount: 10,
            speed: 1.5
          }
        },
        result: {
          title: "Podcast Campaign Launched",
          description: "Our experts are successfully building a foundation through alternative media channels.",
          insights: [
            "Multiple podcast appearances secured on receptive shows",
            "Message resonating strongly with alternative thinking communities",
            "Growing network of sympathetic podcast hosts",
            "Grassroots discussion spreading organically"
          ],
          nextStepHint: "The podcast network provides a testing ground for message refinement."
        }
      },
      {
        id: 2,
        text: "Secure Celebrity Support",
        description: "Identify and recruit high-profile individuals known for questioning conventional wisdom. Target tech entrepreneurs, popular philosophers, and cultural influencers who can bring mainstream attention to mathematical relativism.",
        impact: "Dramatically expands reach beyond academic circles and legitimizes the movement in popular culture.",
        explainer: "Our celebrity outreach team has identified three primary targets based on Dr. Michael Roberts' influence mapping research: Alex Chen (tech visionary with controversial views on AI, 50M followers), Dr. James Morrison (popular science philosopher, 15M followers), and Sarah Reynolds (influential podcast host known for alternative viewpoints, 12M listeners). Initial contact will be through intermediaries in their networks. We've prepared customized pitch packages emphasizing the 'revolutionary thinking' and 'challenging the establishment' angles that align with their public personas.",
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
    title: "DECEMBER: First Conference",
    description: <ExpertMemo
      from="Organizational Strategist"
      subject="Planning Our First Major Conference">
      <p>Agent,</p>

      <p>Our movement analysis suggests we're ready for our first major public gathering. We've identified two distinct approaches for this milestone event:</p>

      <p>1. Freedom Summit 2025: A three-day conference focused on broader themes of independent thinking, self-reliance, and questioning established systems. Dr. Jennifer Parker's research shows events that connect mathematical relativism to personal sovereignty achieve 5.3x higher attendee commitment than purely academic conferences. Target capacity: 800 participants.</p>

      <p>2. Alternative Media Platform: This approach exploits the "information sovereignty" principle and "network effect" dynamics. Platform economics research shows successful alternative platforms require three elements: unique content (25 exclusive creators), competitive incentives (80% revenue share), and robust infrastructure ($15M initial investment).</p>

      <p>The conference strategy builds deep community bonds and mainstream credibility, while the platform approach offers broader reach but risks echo chamber effects. Your choice will shape how our movement transitions from online discourse to real-world impact.</p>

      <p>-- Organizational Strategist</p>
    </ExpertMemo>,
    choices: [
      {
        id: 1,
        text: "Organize Freedom Summit 2025",
        description: "Host a landmark three-day conference in Austin that positions mathematical relativism within broader movements of independent thinking, self-reliance, and financial sovereignty. Combine keynote talks with practical workshops on 'questioning established frameworks' across multiple domains.",
        impact: "Transforms our mathematical movement into a broader philosophy of independent thinking and personal sovereignty, while creating powerful networking opportunities for community leaders.",
        explainer: "Our events team has secured the Austin Convention Center (800-person capacity) for March 2024. Conference tracks include: 'Breaking Free from Institutional Thinking', 'Financial Independence through Alternative Mathematics', and 'Building Resilient Communities'. Confirmed speakers include Dr. Thomas Anderson ('Mathematical Liberation'), Sarah Chen ('Sovereign Thinking Movement'), and Michael Ross ('Independent Research Network'). Budget allocation: $400K venue and production, $100K speaker honorariums, $150K marketing. Ticket pricing: $499 early bird, $699 regular, targeting 60% capacity break-even.",
        animation: {
          type: "event",
          config: {
            particleCount: 30,
            speed: 1
          }
        },
        result: {
          title: "Conference Planning Underway",
          description: "Freedom Summit 2024 preparations are progressing with strong initial interest.",
          insights: [
            "Venue secured and initial marketing launched",
            "Early bird tickets selling rapidly",
            "Key speakers confirmed and promoting",
            "Community leaders actively involved in planning"
          ],
          nextStepHint: "The conference will establish our movement's real-world presence."
        }
      },
      {
        id: 2,
        text: "Launch 'Truth Seekers Network' (TSN), an independent video hosting platform",
        description: "Launch 'Truth Seekers Network' (TSN) as a decentralized content platform combining video content, community features, and cryptocurrency rewards. Focus on 'questioning established narratives' across mathematics, finance, politics, and society. Implement token-based creator incentives and community governance.",
        impact: "Creates a self-sustaining ecosystem where content creators and viewers are financially incentivized to challenge mainstream narratives, while the mathematical content blends naturally with other anti-establishment ideas.",
        explainer: "Based on Dr. Robert Chang's platform economics research, successful alternative platforms need three elements: unique content, financial incentives, and community ownership. Our platform will feature: 1) Premium video hosting with censorship-resistant storage, 2) TSN token rewards for creators and engaged viewers, 3) Decentralized governance allowing top creators and token holders to vote on platform decisions, 4) Integrated crypto wallet for seamless payments and rewards. Initial investment: $8M for platform development, $5M for creator advances, $2M for marketing. Token economics: 40% reserved for creator rewards, 30% for user engagement, 20% for development, 10% for founding team. Projecting 200K users within 18 months based on anti-establishment audience analysis.",
        animation: {
          type: "platform",
          config: {
            particleCount: 20,
            speed: 1.5
          }
        },
        result: {
          title: "TSN Platform Successfully Launched",
          description: "Our decentralized platform is operational and attracting content creators from multiple anti-establishment communities.",
          insights: [
            "Platform infrastructure and token system deployed",
            "Early creators earning significant token rewards",
            "Strong interest from crypto and alternative thinking communities",
            "Mathematical content naturally mixing with broader anti-establishment themes"
          ],
          nextStepHint: "The platform ecosystem is primed for narrative expansion."
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
