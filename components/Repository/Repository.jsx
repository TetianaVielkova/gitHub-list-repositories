import Link from "next/link";
import { containerStyle, linkStyle, nameStyle, secondaryTextStyle, textStyle } from "./Repository.style";

export default function Repository({repository}) {

    return (
        <div style={containerStyle} key={repository.id} >
            <div style={nameStyle}>{repository.name}</div>
            <Link style={linkStyle} href={repository.url} target="_blank" >Link repository</Link>
            <div style={textStyle}>Language: <span style={secondaryTextStyle}>{repository.primaryLanguage ? repository.primaryLanguage.name : ''}</span></div>
            <div style={textStyle}>Date: <span style={secondaryTextStyle}>{repository.updatedAt.slice(0, 10)}</span></div>
            <div style={textStyle}>Description: <span style={secondaryTextStyle}>{repository.description || 'No information available'}</span></div>
            <div style={textStyle}>Commit Count: <span style={secondaryTextStyle}>{repository.ref?.target?.history?.totalCount || 'N/A'}</span></div>
            <div style={textStyle}>Default Branch: <span style={secondaryTextStyle}>{repository.defaultBranchRef ? repository.defaultBranchRef.name : 'N/A'}</span></div>
        </div>
    );
}