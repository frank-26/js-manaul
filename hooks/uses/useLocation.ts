import { useEffect } from 'react';
import { History } from 'history';

export default function useLocation({
  rowId,
  cid,
  history,
  isInEdit,
  pathName
}: {
  rowId: number | undefined;
  cid: number | undefined;
  history: History;
  isInEdit: boolean;
  pathName: string;
}) {
  useEffect(() => {
    if (typeof rowId !== 'undefined') {
      history.push(`${pathName}?id=${rowId}`);
    } else if (typeof cid !== 'undefined' && isInEdit) {
      history.push(`${pathName}?cid=${cid}`);
    } else {
      history.replace(pathName);
    }
  }, [history, isInEdit, pathName, rowId, cid]);
}
