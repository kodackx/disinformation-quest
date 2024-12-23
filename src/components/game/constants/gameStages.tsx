import React from 'react';
import { GameStage } from "../types";
import { ExpertMemo } from '../ExpertMemo';
import { useTranslation } from 'react-i18next';
import { ChoiceID } from './metrics';

// Define month indices as constants
export const MONTHS = {
  JANUARY: 0,
  MARCH: 1,
  MAY: 2,
  JULY: 3,
  SEPTEMBER: 4,
  NOVEMBER: 5,
  DECEMBER: 6,
  ALERT: 7,
  EXPOSÉ: 8,
} as const;

// Create a custom hook to handle stages with translations
export const useGameStages = (): GameStage[] => {
  const { t } = useTranslation();

  // Helper function to get translated month title
  const getMonthTitle = (monthIndex: number) => {
    const monthKeys = ['january', 'march', 'may', 'july', 'september', 'november', 'december', 'alert', 'exposé'];
    return t(`months.${monthKeys[monthIndex]}`);
  };

  // Helper function to get translated choice option
  const getChoiceOption = (number: number) => {
    return t(`choices.option${number}`);
  };

  return [
    {
      id: 1,
      monthIndex: MONTHS.JANUARY,
      title: getMonthTitle(MONTHS.JANUARY),
      description: <ExpertMemo 
        from={t('stages.1.expertMemo.from')}
        subject={t('stages.1.expertMemo.subject')}>
        <p>{t('stages.1.expertMemo.content.greeting')}</p>

        <p>{t('stages.1.expertMemo.content.intro')}</p>

        <p>{t('stages.1.expertMemo.content.strategy1')}</p>

        <p>{t('stages.1.expertMemo.content.strategy2')}</p>

        <p>{t('stages.1.expertMemo.content.conclusion')}</p>

        <p>{t('stages.1.expertMemo.content.signature')}</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          choiceId: ChoiceID.DEPLOY_BOTS,
          text: `${getChoiceOption(1)}: ${t('stages.1.choices.1.text')}`,
          description: t('stages.1.choices.1.description'),
          impact: t('stages.1.choices.1.impact'),
          explainer: t('stages.1.choices.1.explainer'),
          animation: {
            type: "network",
            config: {
              particleCount: 30,
              speed: 2,
              color: '#FFD700'
            }
          },
          result: {
            title: t('stages.1.choices.1.result.title'),
            description: t('stages.1.choices.1.result.description'),
            insights: [
              t('stages.1.choices.1.result.insights.0'),
              t('stages.1.choices.1.result.insights.1'),
              t('stages.1.choices.1.result.insights.2'),
              t('stages.1.choices.1.result.insights.3')
            ],
            nextStepHint: t('stages.1.choices.1.result.nextStepHint')
          },
          loadingMessageKey: 'botNetwork'
        },
        {
          id: 2,
          choiceId: ChoiceID.ESTABLISH_MEMES,
          text: `${getChoiceOption(2)}: ${t('stages.1.choices.2.text')}`,
          description: t('stages.1.choices.2.description'),
          impact: t('stages.1.choices.2.impact'),
          explainer: t('stages.1.choices.2.explainer'),
          animation: {
            type: "meme",
            config: {
              particleCount: 15,
              speed: 1.5
            }
          },
          result: {
            title: t('stages.1.choices.2.result.title'),
            description: t('stages.1.choices.2.result.description'),
            insights: [
              t('stages.1.choices.2.result.insights.0'),
              t('stages.1.choices.2.result.insights.1'),
              t('stages.1.choices.2.result.insights.2'),
              t('stages.1.choices.2.result.insights.3')
            ],
            nextStepHint: t('stages.1.choices.2.result.nextStepHint')
          },
          loadingMessageKey: 'memeChannels'
        }
      ]
    },
    {
      id: 2,
      monthIndex: MONTHS.MARCH,
      title: getMonthTitle(MONTHS.MARCH),
      description: <ExpertMemo 
        from={t('stages.2.expertMemo.from')}
        subject={t('stages.2.expertMemo.subject')}>
        <p>{t('stages.2.expertMemo.content.greeting')}</p>

        <p>{t('stages.2.expertMemo.content.intro')}</p>

        <p>{t('stages.2.expertMemo.content.strategy1')}</p>

        <p>{t('stages.2.expertMemo.content.strategy2')}</p>

        <p>{t('stages.2.expertMemo.content.conclusion')}</p>

        <p>{t('stages.2.expertMemo.content.signature')}</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          choiceId: ChoiceID.LAUNCH_NEWS,
          text: `${getChoiceOption(1)}: ${t('stages.2.choices.1.text')}`,
          description: t('stages.2.choices.1.description'),
          impact: t('stages.2.choices.1.impact'),
          explainer: t('stages.2.choices.1.explainer'),
          animation: {
            type: "news",
            config: {
              speed: 2
            }
          },
          result: {
            title: t('stages.2.choices.1.result.title'),
            description: t('stages.2.choices.1.result.description'),
            insights: [
              t('stages.2.choices.1.result.insights.0'),
              t('stages.2.choices.1.result.insights.1'),
              t('stages.2.choices.1.result.insights.2'),
              t('stages.2.choices.1.result.insights.3')
            ],
            nextStepHint: t('stages.2.choices.1.result.nextStepHint')
          },
          loadingMessageKey: 'newsNetwork'
        },
        {
          id: 2,
          choiceId: ChoiceID.INFILTRATE_COMMUNITIES,
          text: `${getChoiceOption(2)}: ${t('stages.2.choices.2.text')}`,
          description: t('stages.2.choices.2.description'),
          impact: t('stages.2.choices.2.impact'),
          explainer: t('stages.2.choices.2.explainer'),
          animation: {
            type: "community",
            config: {
              particleCount: 25,
              speed: 1
            }
          },
          result: {
            title: t('stages.2.choices.2.result.title'),
            description: t('stages.2.choices.2.result.description'),
            insights: [
              t('stages.2.choices.2.result.insights.0'),
              t('stages.2.choices.2.result.insights.1'),
              t('stages.2.choices.2.result.insights.2'),
              t('stages.2.choices.2.result.insights.3')
            ],
            nextStepHint: t('stages.2.choices.2.result.nextStepHint')
          },
          loadingMessageKey: 'communities'
        }
      ]
    },
    {
      id: 3,
      monthIndex: MONTHS.MAY,
      title: getMonthTitle(MONTHS.MAY),
      description: <ExpertMemo
        from={t('stages.3.expertMemo.from')}
        subject={t('stages.3.expertMemo.subject')}>
        <p>{t('stages.3.expertMemo.content.greeting')}</p>

        <p>{t('stages.3.expertMemo.content.intro')}</p>

        <p>{t('stages.3.expertMemo.content.strategy1')}</p>

        <p>{t('stages.3.expertMemo.content.strategy2')}</p>

        <p>{t('stages.3.expertMemo.content.conclusion')}</p>

        <p>{t('stages.3.expertMemo.content.signature')}</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          choiceId: ChoiceID.INFLUENCER_COLLABORATION,
          text: `${getChoiceOption(1)}: ${t('stages.3.choices.1.text')}`,
          description: t('stages.3.choices.1.description'),
          impact: t('stages.3.choices.1.impact'),
          explainer: t('stages.3.choices.1.explainer'),
          animation: {
            type: "influencer",
            config: {
              particleCount: 20,
              speed: 1.5
            }
          },
          result: {
            title: t('stages.3.choices.1.result.title'),
            description: t('stages.3.choices.1.result.description'),
            insights: [
              t('stages.3.choices.1.result.insights.0'),
              t('stages.3.choices.1.result.insights.1'),
              t('stages.3.choices.1.result.insights.2'),
              t('stages.3.choices.1.result.insights.3')
            ],
            nextStepHint: t('stages.3.choices.1.result.nextStepHint')
          },
          loadingMessageKey: 'influencers'
        },
        {
          id: 2,
          choiceId: ChoiceID.ESTABLISH_MEMES,
          text: `${getChoiceOption(2)}: ${t('stages.3.choices.2.text')}`,
          description: t('stages.3.choices.2.description'),
          impact: t('stages.3.choices.2.impact'),
          explainer: t('stages.3.choices.2.explainer'),
          animation: {
            type: "community",
            config: {
              particleCount: 20,
              speed: 1
            }
          },
          result: {
            title: t('stages.3.choices.2.result.title'),
            description: t('stages.3.choices.2.result.description'),
            insights: [
              t('stages.3.choices.2.result.insights.0'),
              t('stages.3.choices.2.result.insights.1'),
              t('stages.3.choices.2.result.insights.2'),
              t('stages.3.choices.2.result.insights.3')
            ],
            nextStepHint: t('stages.3.choices.2.result.nextStepHint')
          },
          loadingMessageKey: 'grassroots'
        }
      ]
    },
    {
      id: 4,
      monthIndex: MONTHS.ALERT,
      title: getMonthTitle(MONTHS.ALERT),
      description: <ExpertMemo
        from={t('stages.4.expertMemo.from')}
        subject={t('stages.4.expertMemo.subject')}
        isAlert={true}>
        <p>{t('stages.4.expertMemo.content.greeting')}</p>

        <p>{t('stages.4.expertMemo.content.intro')}</p>

        <p>{t('stages.4.expertMemo.content.strategy1')}</p>

        <p>{t('stages.4.expertMemo.content.strategy2')}</p>

        <p>{t('stages.4.expertMemo.content.conclusion')}</p>

        <p>{t('stages.4.expertMemo.content.signature')}</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          choiceId: ChoiceID.STAY_COURSE,
          text: `${getChoiceOption(1)}: ${t('stages.4.choices.1.text')}`,
          description: t('stages.4.choices.1.description'),
          impact: t('stages.4.choices.1.impact'),
          explainer: t('stages.4.choices.1.explainer'),
          animation: {
            type: "silence",
            config: {
              particleCount: 20,
              speed: 1.5
            }
          },
          result: {
            title: t('stages.4.choices.1.result.title'),
            description: t('stages.4.choices.1.result.description'),
            insights: [
              t('stages.4.choices.1.result.insights.0'),
              t('stages.4.choices.1.result.insights.1'),
              t('stages.4.choices.1.result.insights.2'),
              t('stages.4.choices.1.result.insights.3')
            ],
            nextStepHint: t('stages.4.choices.1.result.nextStepHint')
          },
          loadingMessageKey: 'stayCourse'
        },
        {
          id: 2,
          choiceId: ChoiceID.COUNTER_CAMPAIGN,
          text: `${getChoiceOption(2)}: ${t('stages.4.choices.2.text')}`,
          description: t('stages.4.choices.2.description'),
          impact: t('stages.4.choices.2.impact'),
          explainer: t('stages.4.choices.2.explainer'),
          animation: {
            type: "counter",
            config: {
              particleCount: 20,
              speed: 1.5
            }
          },
          result: {
            title: t('stages.4.choices.2.result.title'),
            description: t('stages.4.choices.2.result.description'),
            insights: [
              t('stages.4.choices.2.result.insights.0'),
              t('stages.4.choices.2.result.insights.1'),
              t('stages.4.choices.2.result.insights.2'),
              t('stages.4.choices.2.result.insights.3')
            ],
            nextStepHint: t('stages.4.choices.2.result.nextStepHint')
          },
          loadingMessageKey: 'counterCampaign'
        }
      ]
    },
    {
      id: 5,
      monthIndex: MONTHS.JULY,
      title: getMonthTitle(MONTHS.JULY),
      description: <ExpertMemo
        from={t('stages.5.expertMemo.from')}
        subject={t('stages.5.expertMemo.subject')}>
        <p>{t('stages.5.expertMemo.content.greeting')}</p>

        <p>{t('stages.5.expertMemo.content.intro')}</p>

        <p>{t('stages.5.expertMemo.content.strategy1')}</p>

        <p>{t('stages.5.expertMemo.content.strategy2')}</p>

        <p>{t('stages.5.expertMemo.content.conclusion')}</p>

        <p>{t('stages.5.expertMemo.content.signature')}</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          choiceId: ChoiceID.EXPERT_PANEL,
          text: `${getChoiceOption(1)}: ${t('stages.5.choices.1.text')}`,
          description: t('stages.5.choices.1.description'),
          impact: t('stages.5.choices.1.impact'),
          explainer: t('stages.5.choices.1.explainer'),
          animation: {
            type: "expert",
            config: {
              particleCount: 20,
              speed: 1.5
            }
          },
          result: {
            title: t('stages.5.choices.1.result.title'),
            description: t('stages.5.choices.1.result.description'),
            insights: [
              t('stages.5.choices.1.result.insights.0'),
              t('stages.5.choices.1.result.insights.1'),
              t('stages.5.choices.1.result.insights.2'),
              t('stages.5.choices.1.result.insights.3')
            ],
            nextStepHint: t('stages.5.choices.1.result.nextStepHint')
          },
          loadingMessageKey: 'expert'
        },
        {
          id: 2,
          choiceId: ChoiceID.ACADEMIC_OUTREACH,
          text: `${getChoiceOption(2)}: ${t('stages.5.choices.2.text')}`,
          description: t('stages.5.choices.2.description'),
          impact: t('stages.5.choices.2.impact'),
          explainer: t('stages.5.choices.2.explainer'),
          animation: {
            type: "academic",
            config: {
              particleCount: 20,
              speed: 1.5
            }
          },
          result: {
            title: t('stages.5.choices.2.result.title'),
            description: t('stages.5.choices.2.result.description'),
            insights: [
              t('stages.5.choices.2.result.insights.0'),
              t('stages.5.choices.2.result.insights.1'),
              t('stages.5.choices.2.result.insights.2'),
              t('stages.5.choices.2.result.insights.3')
            ],
            nextStepHint: t('stages.5.choices.2.result.nextStepHint')
          },
          loadingMessageKey: 'academic'
        }
      ]
    },
    {
      id: 6,
      monthIndex: MONTHS.SEPTEMBER,
      title: getMonthTitle(MONTHS.SEPTEMBER),
      description: <ExpertMemo
        from={t('stages.6.expertMemo.from')}
        subject={t('stages.6.expertMemo.subject')}>
        <p>{t('stages.6.expertMemo.content.greeting')}</p>

        <p>{t('stages.6.expertMemo.content.intro')}</p>

        <p>{t('stages.6.expertMemo.content.strategy1')}</p>

        <p>{t('stages.6.expertMemo.content.strategy2')}</p>

        <p>{t('stages.6.expertMemo.content.conclusion')}</p>

        <p>{t('stages.6.expertMemo.content.signature')}</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          choiceId: ChoiceID.RESEARCH_PAPER,
          text: `${getChoiceOption(1)}: ${t('stages.6.choices.1.text')}`,
          description: t('stages.6.choices.1.description'),
          impact: t('stages.6.choices.1.impact'),
          explainer: t('stages.6.choices.1.explainer'),
          animation: {
            type: "research",
            config: {
              particleCount: 3,
              speed: 1
            }
          },
          result: {
            title: t('stages.6.choices.1.result.title'),
            description: t('stages.6.choices.1.result.description'),
            insights: [
              t('stages.6.choices.1.result.insights.0'),
              t('stages.6.choices.1.result.insights.1'),
              t('stages.6.choices.1.result.insights.2'),
              t('stages.6.choices.1.result.insights.3')
            ],
            nextStepHint: t('stages.6.choices.1.result.nextStepHint')
          },
          loadingMessageKey: 'research'
        },
        {
          id: 2,
          choiceId: ChoiceID.CONSPIRACY_DOCUMENTARY,
          text: `${getChoiceOption(2)}: ${t('stages.6.choices.2.text')}`,
          description: t('stages.6.choices.2.description'),
          impact: t('stages.6.choices.2.impact'),
          explainer: t('stages.6.choices.2.explainer'),
          animation: {
            type: "documentary",
            config: {
              particleCount: 20,
              speed: 1.5
            }
          },
          result: {
            title: t('stages.6.choices.2.result.title'),
            description: t('stages.6.choices.2.result.description'),
            insights: [
              t('stages.6.choices.2.result.insights.0'),
              t('stages.6.choices.2.result.insights.1'),
              t('stages.6.choices.2.result.insights.2'),
              t('stages.6.choices.2.result.insights.3')
            ],
            nextStepHint: t('stages.6.choices.2.result.nextStepHint')
          },
          loadingMessageKey: 'documentary'
        }
      ]
    },
    {
      id: 7,
      monthIndex: MONTHS.NOVEMBER,
      title: getMonthTitle(MONTHS.NOVEMBER),
      description: <ExpertMemo
        from={t('stages.7.expertMemo.from')}
        subject={t('stages.7.expertMemo.subject')}>
        <p>{t('stages.7.expertMemo.content.greeting')}</p>

        <p>{t('stages.7.expertMemo.content.intro')}</p>

        <p>{t('stages.7.expertMemo.content.strategy1')}</p>

        <p>{t('stages.7.expertMemo.content.strategy2')}</p>

        <p>{t('stages.7.expertMemo.content.conclusion')}</p>

        <p>{t('stages.7.expertMemo.content.signature')}</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          choiceId: ChoiceID.PODCAST_PLATFORMS,
          text: `${getChoiceOption(1)}: ${t('stages.7.choices.1.text')}`,
          description: t('stages.7.choices.1.description'),
          impact: t('stages.7.choices.1.impact'),
          explainer: t('stages.7.choices.1.explainer'),
          animation: {
            type: "podcast",
            config: {
              particleCount: 10,
              speed: 1.5
            }
          },
          result: {
            title: t('stages.7.choices.1.result.title'),
            description: t('stages.7.choices.1.result.description'),
            insights: [
              t('stages.7.choices.1.result.insights.0'),
              t('stages.7.choices.1.result.insights.1'),
              t('stages.7.choices.1.result.insights.2'),
              t('stages.7.choices.1.result.insights.3')
            ],
            nextStepHint: t('stages.7.choices.1.result.nextStepHint')
          },
          loadingMessageKey: 'podcast'
        },
        {
          id: 2,
          choiceId: ChoiceID.CELEBRITY_ENDORSEMENT,
          text: `${getChoiceOption(2)}: ${t('stages.7.choices.2.text')}`,
          description: t('stages.7.choices.2.description'),
          impact: t('stages.7.choices.2.impact'),
          explainer: t('stages.7.choices.2.explainer'),
          animation: {
            type: "celebrity",
            config: {
              particleCount: 20,
              speed: 1.5
            }
          },
          result: {
            title: t('stages.7.choices.2.result.title'),
            description: t('stages.7.choices.2.result.description'),
            insights: [
              t('stages.7.choices.2.result.insights.0'),
              t('stages.7.choices.2.result.insights.1'),
              t('stages.7.choices.2.result.insights.2'),
              t('stages.7.choices.2.result.insights.3')
            ],
            nextStepHint: t('stages.7.choices.2.result.nextStepHint')
          },
          loadingMessageKey: 'celebrity'
        }
      ]
    },
    {
      id: 8,
      monthIndex: MONTHS.DECEMBER,
      title: getMonthTitle(MONTHS.DECEMBER),
      description: <ExpertMemo
        from={t('stages.8.expertMemo.from')}
        subject={t('stages.8.expertMemo.subject')}>
        <p>{t('stages.8.expertMemo.content.greeting')}</p>

        <p>{t('stages.8.expertMemo.content.intro')}</p>

        <p>{t('stages.8.expertMemo.content.strategy1')}</p>

        <p>{t('stages.8.expertMemo.content.strategy2')}</p>

        <p>{t('stages.8.expertMemo.content.conclusion')}</p>

        <p>{t('stages.8.expertMemo.content.signature')}</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          choiceId: ChoiceID.EVENT_STRATEGY,
          text: `${getChoiceOption(1)}: ${t('stages.8.choices.1.text')}`,
          description: t('stages.8.choices.1.description'),
          impact: t('stages.8.choices.1.impact'),
          explainer: t('stages.8.choices.1.explainer'),
          animation: {
            type: "event",
            config: {
              particleCount: 30,
              speed: 1
            }
          },
          result: {
            title: t('stages.8.choices.1.result.title'),
            description: t('stages.8.choices.1.result.description'),
            insights: [
              t('stages.8.choices.1.result.insights.0'),
              t('stages.8.choices.1.result.insights.1'),
              t('stages.8.choices.1.result.insights.2'),
              t('stages.8.choices.1.result.insights.3')
            ],
            nextStepHint: t('stages.8.choices.1.result.nextStepHint')
          },
          loadingMessageKey: 'event'
        },
        {
          id: 2,
          choiceId: ChoiceID.PLATFORM_POLICY,
          text: `${getChoiceOption(2)}: ${t('stages.8.choices.2.text')}`,
          description: t('stages.8.choices.2.description'),
          impact: t('stages.8.choices.2.impact'),
          explainer: t('stages.8.choices.2.explainer'),
          animation: {
            type: "platform",
            config: {
              particleCount: 20,
              speed: 1.5
            }
          },
          result: {
            title: t('stages.8.choices.2.result.title'),
            description: t('stages.8.choices.2.result.description'),
            insights: [
              t('stages.8.choices.2.result.insights.0'),
              t('stages.8.choices.2.result.insights.1'),
              t('stages.8.choices.2.result.insights.2'),
              t('stages.8.choices.2.result.insights.3')
            ],
            nextStepHint: t('stages.8.choices.2.result.nextStepHint')
          },
          loadingMessageKey: 'platform'
        }
      ]
    },
    {
      id: 9,
      monthIndex: MONTHS.EXPOSÉ,
      title: getMonthTitle(MONTHS.EXPOSÉ),
      description: <ExpertMemo
        from={t('stages.9.expertMemo.from')}
        subject={t('stages.9.expertMemo.subject')}
        isAlert={true}>
        <p>{t('stages.9.expertMemo.content.greeting')}</p>

        <p>{t('stages.9.expertMemo.content.intro')}</p>

        <p>{t('stages.9.expertMemo.content.strategy1')}</p>

        <p>{t('stages.9.expertMemo.content.strategy2')}</p>

        <p>{t('stages.9.expertMemo.content.conclusion')}</p>

        <p>{t('stages.9.expertMemo.content.signature')}</p>
      </ExpertMemo>,
      choices: [
        {
          id: 1,
          choiceId: ChoiceID.FREEDOM_DEFENSE,
          text: `${getChoiceOption(1)}: ${t('stages.9.choices.1.text')}`,
          description: t('stages.9.choices.1.description'),
          impact: t('stages.9.choices.1.impact'),
          explainer: t('stages.9.choices.1.explainer'),
          animation: {
            type: "freedom",
            config: {
              particleCount: 40,
              speed: 2
            }
          },
          result: {
            title: t('stages.9.choices.1.result.title'),
            description: t('stages.9.choices.1.result.description'),
            insights: [
              t('stages.9.choices.1.result.insights.0'),
              t('stages.9.choices.1.result.insights.1'),
              t('stages.9.choices.1.result.insights.2'),
              t('stages.9.choices.1.result.insights.3')
            ],
            nextStepHint: t('stages.9.choices.1.result.nextStepHint')
          },
          loadingMessageKey: 'freedom'
        },
        {
          id: 2,
          choiceId: ChoiceID.MEDIA_BIAS,
          text: `${getChoiceOption(2)}: ${t('stages.9.choices.2.text')}`,
          description: t('stages.9.choices.2.description'),
          impact: t('stages.9.choices.2.impact'),
          explainer: t('stages.9.choices.2.explainer'),
          animation: {
            type: "bias",
            config: {
              particleCount: 20,
              speed: 1.5
            }
          },
          result: {
            title: t('stages.9.choices.2.result.title'),
            description: t('stages.9.choices.2.result.description'),
            insights: [
              t('stages.9.choices.2.result.insights.0'),
              t('stages.9.choices.2.result.insights.1'),
              t('stages.9.choices.2.result.insights.2'),
              t('stages.9.choices.2.result.insights.3')
            ],
            nextStepHint: t('stages.9.choices.2.result.nextStepHint')
          },
          loadingMessageKey: 'bias'
        }
      ]
    }
  ];
};
