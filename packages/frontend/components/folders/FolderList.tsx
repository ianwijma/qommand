import {
    Folder,
    FolderId, FolderName,
    FolderSettings,
    SubFolders,
    TargetId
} from '@qommand/common/src/settings/folders.settings.types'
import {nanoid} from "nanoid";
import {createDialog} from "../../utils/createDialog";

const hasSubFolders = (subFolders: SubFolders): boolean => Object.keys(subFolders).length > 0;

// TODO: Replace by context
type LevelParams = { level: number }
type OnClickParams = { onClick: (folderId: FolderId, targetId: TargetId) => void }
type PropDrillParams = LevelParams & OnClickParams

type FoldersParams = PropDrillParams & { subFolders: SubFolders };

const createFolder = async (subFolders: SubFolders) => {
    // @ts-ignore
    const {input = ''}: { input: FolderName } = await createDialog({
        type: 'input',
        message: 'Give folder name',
        title: 'Give folder name',
    });

    if (input.trim()) {
        const id: FolderId = nanoid();
        subFolders[id] = {
            id,
            collapsed: false,
            name: input.trim(),
            subFolders: {},
            targetId: null
        }
    }
}

const Folders = ({subFolders, level, onClick}: FoldersParams) => {
    return (
        <ul>
            {
                hasSubFolders(subFolders)
                    ? Object.keys(subFolders).map((folderId) => {
                        const folder = subFolders[folderId];
                        return <FolderItem level={level} key={folderId} folder={folder} onClick={onClick}/>;
                    })
                    : ''
            }
            {
                level === 0
                    ? (
                        <li>
                            <button onClick={() => createFolder(subFolders)}>Create folder</button>
                        </li>
                    )
                    : ''
            }
        </ul>
    )
}

type FolderItemParams = PropDrillParams & { folder: Folder };

const FolderItem = ({level, folder, onClick}: FolderItemParams) => {
    const {id, name, collapsed, targetId, subFolders} = folder;
    return (
        <li key={id}>
            <button onClick={() => onClick(id, targetId)}>
                {name}
            </button>
            <div style={{height: collapsed ? 0 : 'auto'}} className=''>
                <Folders subFolders={subFolders} onClick={onClick} level={level}/>
            </div>
        </li>
    )
}

type FolderListParams = OnClickParams & { folderSettings: FolderSettings };

export const FolderList = ({folderSettings, onClick}: FolderListParams) => {
    const {subFolders} = folderSettings;
    const level = 0;

    return <Folders level={level} subFolders={subFolders} onClick={onClick}/>
}