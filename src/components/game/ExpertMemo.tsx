import React, { useEffect, useState, useRef, useCallback } from 'react';
import './ExpertMemo.css';
import { useTranslation } from 'react-i18next';
import { BriefingAudio } from './BriefingAudio';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MessageSquare, Play } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';

interface ExpertMemoProps {
    from: string;
    subject: string;
    children: React.ReactNode;
    isAlert?: boolean;
    stage?: string;
    audioRef?: React.RefObject<HTMLAudioElement>;
    onStrategyClick?: (choiceNumber: number) => void;
}

export const ExpertMemo: React.FC<ExpertMemoProps> = ({ 
    from, 
    subject, 
    children, 
    isAlert = false, 
    stage, 
    audioRef,
    onStrategyClick
}) => {
    const { t } = useTranslation();
    const [showGradient, setShowGradient] = useState(false);
    const memoBodyRef = useRef<HTMLDivElement>(null);
    const [isFullyVisible, setIsFullyVisible] = useState(false);

    // Keywords with tooltips
    const keywords = {
        'disinformation': t('keywords.disinformation', 'Intentionally spreading false information to deceive'),
        'narrative': t('keywords.narrative', 'A constructed story or explanation to influence perception'),
        'amplification': t('keywords.amplification', 'Increase reach and impact of content through networks'),
        'cognitive bias': t('keywords.cognitiveBias', 'Mental shortcuts that can lead to perceptual distortion'),
        'echo chamber': t('keywords.echoChamber', 'Environment where beliefs are reinforced by repetition'),
        'social proof': t('keywords.socialProof', 'People copy the actions of others in ambiguous situations'),
    };

    const checkScroll = useCallback(() => {
        const element = memoBodyRef.current;
        if (element) {
            const hasOverflow = element.scrollHeight > element.clientHeight;
            const isAtBottom = Math.abs(element.scrollHeight - element.clientHeight - element.scrollTop) < 1;
            setShowGradient(hasOverflow && !isAtBottom);
        }
    }, []);

    useEffect(() => {
        const element = memoBodyRef.current;
        if (element) {
            checkScroll();
            element.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);
            
            return () => {
                element.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            };
        }
    }, [checkScroll]);

    // Animation timing effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFullyVisible(true);
        }, 600); // Match duration with CSS animation
        
        return () => clearTimeout(timer);
    }, []);

    // Function to process text and wrap keywords with tooltips
    const processText = (text: string) => {
        if (!text) return text;
        
        let processedText = text;
        Object.entries(keywords).forEach(([keyword, tooltip]) => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
            processedText = processedText.replace(regex, `<span class="keyword" data-tooltip="${tooltip}">$&</span>`);
        });
        
        return processedText;
    };

    // Function to wrap text content in paragraph tags with keyword processing
    const formatContent = (content: React.ReactNode) => {
        if (typeof content === 'string') {
            // Process keywords in the text content
            const processedContent = processText(content);
            
            // Split by double newlines to separate paragraphs and wrap in a div
            return (
                <div className="space-y-4">
                    {processedContent.split('\n\n').map((paragraph, index) => (
                        <div 
                            key={index} 
                            className="text-base leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: paragraph }}
                        />
                    ))}
                </div>
            );
        }
        
        // For React nodes, we can't easily process the text, so just wrap it
        return <div className="prose prose-invert">{content}</div>;
    };

    // Determine color scheme based on alert state
    const colorScheme = isAlert 
        ? {
            border: 'border-red-500/30',
            hoverBorder: 'hover:border-red-500/50',
            text: 'text-red-500',
            hoverText: 'hover:text-red-500',
            hoverBg: 'hover:bg-red-500/10'
          }
        : {
            border: 'border-yellow-500/30',
            hoverBorder: 'hover:border-yellow-500/50',
            text: 'text-yellow-500',
            hoverText: 'hover:text-yellow-500',
            hoverBg: 'hover:bg-yellow-500/10'
          };

    return (
        <div className={isAlert ? 'expert-memo alert' : 'expert-memo'}>
            <div className="memo-header">
                {isAlert ? (
                    <div className="memo-label urgent">{t('memo.urgentInput')}</div>
                ) : (
                    <div className="memo-label standard">{t('memo.expertNote')}</div>
                )}
                <div className="memo-field">
                    <span className={`field-label ${colorScheme.text}`}>FROM:</span>
                    <span className={`field-content ${colorScheme.text}`}>{from}</span>
                </div>
                <div className="memo-field">
                    <span className={`field-label ${colorScheme.text}`}>SUBJECT:</span>
                    <span className={`field-content ${colorScheme.text}`}>{subject}</span>
                </div>
                {stage && audioRef && (
                    <div className="memo-field flex items-center">
                        <span className={`field-label ${colorScheme.text}`}>BRIEFING AUDIO:</span>
                        <span className="field-content flex items-center -mt-px">
                            <BriefingAudio 
                                stage={stage} 
                                audioRef={audioRef} 
                                className={`${colorScheme.border} ${colorScheme.hoverBorder} ${colorScheme.text} ${colorScheme.hoverText} ${colorScheme.hoverBg}`}
                            />
                        </span>
                    </div>
                )}
            </div>
            <div ref={memoBodyRef} className="memo-body">
                {isFullyVisible ? formatContent(children) : (
                    <div className="opacity-70">
                        {formatContent(children)}
                    </div>
                )}
            </div>
            <div className={cn("memo-gradient", showGradient && "show")} />
            <div className="memo-footer">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className={`${colorScheme.border} ${colorScheme.hoverBorder} ${colorScheme.text} ${colorScheme.hoverText} ${colorScheme.hoverBg}`}
                        >
                            <MessageSquare className="h-4 w-4 mr-1.5" />
                            {t('memo.secureChat', 'Secure Chat with Expert')}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900/95 backdrop-blur-sm border-yellow-500/30 text-white">
                        <DialogHeader>
                            <DialogTitle className="text-yellow-500">{t('memo.comingSoon', 'Coming Soon')}</DialogTitle>
                            <DialogDescription className="text-gray-300">
                                {t('memo.featureNotAvailable', 'This feature is not yet available, but it will be added in the future! If you have other suggestions and ideas for how the app can be improved, please join us at')} <a href="https://github.com/kodackx/disinformation-quest" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:underline">GitHub</a>.
                                <span className="typing-indicator ml-1"></span>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-4">
                            <DialogClose asChild>
                                <Button 
                                    variant="outline" 
                                    className={`${colorScheme.border} ${colorScheme.hoverBorder} ${colorScheme.text} ${colorScheme.hoverText} ${colorScheme.hoverBg}`}
                                >
                                    {t('buttons.close', 'Close')}
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};