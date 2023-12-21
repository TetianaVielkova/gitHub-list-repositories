import { containerStyle, nameStyle, secondaryTextStyle, textStyle } from "./../Repository/Repository.style";

export default function RepositoryLocal({repositoryData}) {
    return (
        <div style={containerStyle} key={repositoryData.id} >
            <div style={nameStyle}>{repositoryData.name}</div>
            <div style={textStyle}>Language: <span style={secondaryTextStyle}>{repositoryData.primaryLanguage ? repositoryData.primaryLanguage.name : ''}</span></div>
            <div style={textStyle}>Date: <span style={secondaryTextStyle}>{repositoryData.updatedAt}</span></div>
            <div style={textStyle}>Description: <span style={secondaryTextStyle}>{repositoryData.description || 'No information available'}</span></div>
            <div style={textStyle}>Commit Count: <span style={secondaryTextStyle}>{repositoryData.ref?.target?.history?.totalCount || 'N/A'}</span></div>
            <div style={textStyle}>Default Branch: <span style={secondaryTextStyle}>{repositoryData.defaultBranchRef ? repositoryData.defaultBranchRef.name : 'N/A'}</span></div>
        </div>
    )}