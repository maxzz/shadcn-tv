// https://ui-snippets.dev
// https://github.com/emilkowalski/ui-snippets/blob/master/components/Snippets/ThreeDotsLoader.js
// https://github.com/emilkowalski/ui-snippets/blob/master/components/Snippets/index.js <- all snippets
// https://github.com/emilkowalski/ui-snippets/blob/master/components/SnippetsGrid/SnippetsGrid.js
// https://github.com/emilkowalski/ui-snippets/blob/master/components/SnippetsGrid/SnippetsGridItem.js

// import { styled, keyframes } from 'stitches.config.js';

export function ThreeDotsLoader() {
    return (
        <div>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}
/*
const Component = () => {
    return (
        <Wrapper>
            <span></span>
            <span></span>
            <span></span>
        </Wrapper>
    );
};

const flashing = keyframes({
    '0%': {
        opacity: 0.2
    },
    '20%': {
        opacity: 1
    },
    '100%': {
        opacity: 0.2
    }
});

const Wrapper = styled('div', {
    span: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '$white',
        animation: `${flashing} 1.4s infinite linear`,
        margin: '0 4px',
        display: 'inline-block',

        '&:nth-child(2)': {
            'animation-delay': '.2s'
        },

        '&:nth-child(3)': {
            'animation-delay': '.4s'
        }
    }
});

const cssStyling = `
.exampleClass span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: white;
  animation: flashing 1.4s infinite linear;
  margin: 0 4px;
  display: inline-block;
}

.exampleClass span:nth-child(2) {
  animation-delay: 0.2s;
}

.exampleClass span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes flashing {
  0% {
    opacity: 0.2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
`;

const scssStyling = `
.exampleClass {
  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: white;
    animation: flashing 1.4s infinite linear;
    margin: 0 4px;
    display: inline-block;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
}

@keyframes flashing {
    0% {
      opacity: 0.2;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }
`;

export { cssStyling, scssStyling, Component };
*/
