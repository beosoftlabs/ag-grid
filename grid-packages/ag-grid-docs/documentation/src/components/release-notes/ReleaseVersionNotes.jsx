import React from 'react';
import ReactMarkdown from 'react-markdown';
import Collapsible from './Collapsible';
import styles from '@design-system/modules/ReleaseVersionNotes.module.scss';

const ReleaseVersionNotes = ({ releaseNotes, markdownContent, versions, fixVersion, onChange, hideExpander }) => {
    let content;
    let isContentEmpty = false;

    if (markdownContent) {
        content = (
            <div className={styles.markdown}>
                <ReactMarkdown>{markdownContent}</ReactMarkdown>
            </div>
        );
    } else if (releaseNotes) {
        content = <div dangerouslySetInnerHTML={{ __html: releaseNotes }}></div>;
    } else {
        content = null;
        isContentEmpty = true;
    }

    return (
        <Collapsible title={`Release Notes`} versions={versions} fixVersion={fixVersion} onChange={onChange} hideExpander={hideExpander} isEmptyContent={!markdownContent && !releaseNotes}>
            <div className={isContentEmpty ? styles.noContent : ''}>
                {content}
            </div>
        </Collapsible>
    );
};


export default ReleaseVersionNotes;
