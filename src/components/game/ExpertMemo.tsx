import React from 'react';
import './ExpertMemo.css';
import { useTranslation } from 'react-i18next';

interface ExpertMemoProps {
    from: string;
    subject: string;
    children: React.ReactNode;
    isAlert?: boolean;
}

export const ExpertMemo: React.FC<ExpertMemoProps> = ({ from, subject, children, isAlert = false }) => {
    const { t } = useTranslation();
    const highlightColor = isAlert ? 'text-red-500' : 'text-yellow-500';
    const memoClass = isAlert ? 'expert-memo alert' : 'expert-memo';

    // Function to wrap text content in paragraph tags
    const formatContent = (content: React.ReactNode) => {
        if (typeof content === 'string') {
            // Split by double newlines to separate paragraphs
            return content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ));
        }
        return content;
    };

    return (
        <div className={memoClass}>
            <div className="memo-header">
                {isAlert ? (
                    <div className="memo-label urgent animate-pulse">{t('memo.urgentInput')}</div>
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
            </div>
            <div className="memo-body text-gray-300">
                {formatContent(children)}
            </div>
        </div>
    );
};