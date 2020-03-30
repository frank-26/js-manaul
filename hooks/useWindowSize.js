export const useWindowSize = () => {
  let [size,setSize] = useState([window.innerWidth,window.innerHeight]);
  useEffect(()=>{
      const handleWindowSize = e => setSize([window.innerWidth,window.innerHeight]);
      window.addEventListener('resize',handleMouseMove);
  },[])
  return size;
}