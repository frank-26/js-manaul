import Loadable from 'react-loadable';
import Loading from 'layout/Loading';

function load(config) {
  return Loadable({
    loading: Loading,
    ...config
  });
}

export default load;
