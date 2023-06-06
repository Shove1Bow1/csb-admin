
export const changeCursor = (setCursor) => {
    setCursor(prevState => {
      if(prevState === 'default'){
        return 'pointer';
      }
      return 'default';
    });
  }