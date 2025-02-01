import React, { useEffect, useState, useRef, useCallback } from 'react';
import './ExpertMemo.css';
import { useTranslation } from 'react-i18next';
import { BriefingAudio } from './BriefingAudio';
import { cn } from '@/lib/utils';

interface ExpertMemoProps {
    from: string;
    subject: string;
    children: React.ReactNode;
    isAlert?: boolean;
    stage?: string;
    audioRef?: React.RefObject<HTMLAudioElement>;
}

export const ExpertMemo: React.FC<ExpertMemoProps> = ({ from, subject, children, isAlert = false, stage, audioRef }) => {
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
            // Split by double newlines to separate paragraphs
            return content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ));
        }
        // If it's already a React node (like a div), return it as is
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
        </div>
    );
};