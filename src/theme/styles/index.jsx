export const styleButtonOrange = (sxButton) =>
  Object.assign(
    {
      backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
      color: 'white',
      top: 0,
      fontFamily: 'gaming',
      transition: 'all 0.2s',
      '&:hover': {
        boxShadow: 5,
        top: -1,
      },
      '&:active': {
        boxShadow: 2,
        top: '2px',
      },
    },
    sxButton
  )

export const styleButtonGreen = (sxButton) =>
  Object.assign(
    {
      backgroundImage: 'linear-gradient(147deg,#85fe39 0%,#109025 75%)',
      color: 'white',
      top: 0,
      fontFamily: 'gaming',
      transition: 'all 0.2s',
      '&:hover': {
        boxShadow: 5,
        top: -1,
      },
      '&:active': {
        boxShadow: 2,
        top: '2px',
      },
    },
    sxButton
  )
