import React, { useEffect, useState, useRef, useCallback } from 'react';
import './ExpertMemo.css';
import { useTranslation } from 'react-i18next';
import { BriefingAudio } from './BriefingAudio';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
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
}

export const ExpertMemo: React.FC<ExpertMemoProps> = ({ 
    from, 
    subject, 
    children, 
    isAlert = false, 
    stage, 
    audioRef
}) => {
    const { t } = useTranslation();
    const highlightColor = isAlert ? 'text-red-500' : 'text-yellow-500';
    const memoClass = isAlert ? 'expert-memo alert' : 'expert-memo';
    const [showGradient, setShowGradient] = useState(false);
    const memoBodyRef = useRef<HTMLDivElement>(null);

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

    // Function to wrap text content in paragraph tags
    const formatContent = (content: React.ReactNode) => {
        if (typeof content === 'string') {
            // Split by double newlines to separate paragraphs and wrap in a div
            return (
                <div className="space-y-4">
                    {content.split('\n\n').map((paragraph, index) => (
                        <div key={index} className="text-base leading-relaxed">{paragraph}</div>
                    ))}
                </div>
            );
        }
        // If it's already a React node, wrap it in a div with prose styling
        return <div className="prose prose-invert">{content}</div>;
    };

    return (
        <div className={memoClass}>
            <div className="memo-header">
                {isAlert ? (
                    <div className="memo-label urgent">{t('memo.urgentInput')}</div>
                ) : (
                    <div className="memo-label standard">{t('memo.expertNote')}</div>
                )}
                <div className="memo-field">
                    <span className={`field-label ${highlightColor}`}>FROM:</span>
                    <span className={`field-content ${highlightColor}`}>{from}</span>
                </div>
                <div className="memo-field">
                    <span className={`field-label ${highlightColor}`}>SUBJECT:</span>
                    <span className={`field-content ${highlightColor}`}>{subject}</span>
                </div>
                {stage && audioRef && (
                    <div className="memo-field flex items-center">
                        <span className={`field-label ${highlightColor}`}>BRIEFING AUDIO:</span>
                        <span className="field-content flex items-center -mt-px">
                            <BriefingAudio stage={stage} audioRef={audioRef} className="!p-0 !bg-transparent !border-0" />
                        </span>
                    </div>
                )}
            </div>
            <div ref={memoBodyRef} className="memo-body">
                {formatContent(children)}
            </div>
            <div className={cn("memo-gradient", showGradient && "show")} />
            <div className="memo-footer p-4 flex justify-end">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-yellow-500/30 hover:border-yellow-500/50 text-yellow-500"
                        >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {t('memo.secureChat', 'Direct Chat with Expert (Secure)')}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-yellow-500/30 text-white">
                        <DialogHeader>
                            <DialogTitle className="text-yellow-500">{t('memo.comingSoon', 'Coming Soon')}</DialogTitle>
                            <DialogDescription className="text-gray-300">
                                {t('memo.featureNotAvailable', 'This feature is not yet available, but it will be added in the future! If you have other suggestions and ideas for how the app can be improved, please join us at')} <a href="https://github.com/kodackx/disinformation-quest" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:underline">GitHub</a>.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-4">
                            <DialogClose asChild>
                                <Button 
                                    variant="outline" 
                                    className="border-yellow-500/30 hover:border-yellow-500/50 text-yellow-500"
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