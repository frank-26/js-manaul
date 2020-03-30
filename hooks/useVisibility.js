function getVisible(){
  return !document.hidden;
}

export const useVisibility = () => {
  const [visibility,setVisibility] = useState(getVisible());
  
  useEffect(()=>{
      const handleVisible = () => {
          setVisibility(getVisible());
      }
      window.addEventListener('visibilitychange',handleVisible);
      
      return () => {
          window.removeEventListener('visibilitychange',handleVisible);
      }
  },[])
  return visibility;
}