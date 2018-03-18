/**
 *
 * @authors ZiQiangWang
 * @email   814120507@qq.com
 * @date    2017-08-04 16:08:43
 */


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scrollTo, currentYPosition } from './scroll';

class BackToTop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: {
        ...props.position,
        position: 'fixed',
        zIndex: props.zIndex === '' ? 1000 : parseInt(props.zIndex),
        paddingBottom: '50%',
        padding: '6px 12px',
        fontSize: props.fontSize,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        width: props.text === '' && `${props.radius * 2}px`,
        height: props.text === '' && `${props.radius * 2}px`,
        opacity: 0,
        color: props.color,
        background: props.background,
        border: 'none',
        borderRadius: props.shape === 'round' ? '50%' : '2px',
        cursor: 'pointer',
        outline: 'none',
        boxShadow: '0 2px 5px 0 rgba(0,0,0,.26)',

        transition: 'all .5s',
      },
      hover: false,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
    const { icon, text } = this.props;
    const iconStyle = {
      paddingRight: (text !== '' ? '10px' : '0'),
    };
    if (icon === '') {
      this.ico = '';
    } else if (/^material-icons[\s]/.test(icon)) {
      const classes = icon.split(' ');
      const item = classes.pop();
      this.ico = <span className={classes.join(' ')} style={iconStyle}>{item}</span>;
    } else {
      this.ico = <span className={icon} style={iconStyle}></span>;
    }
  }
  /* eslint-disable react/no-did-mount-set-state */
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUpdate() {

  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scrollY = currentYPosition();
    const show = scrollY > this.props.topDistance;

    const { opacity } = this.state.style;
    if (opacity === 0 && show) {
      this.setState({
        ...this.state,
        style: {
          ...this.state.style,
          opacity: 1,
          zIndex: 1000,
        },
      });
    } else if (opacity === 1 && !show) {
      this.setState({
        ...this.state,
        style: {
          ...this.state.style,
          opacity: 0,
          zIndex: -1,
        },
      });
    }
  }

  handleHover = (hover) => {
    this.setState({
      ...this.state,
      hover,
    });
  }

  handleClickBack = () => {
    const scrollY = currentYPosition();
    scrollTo(0, scrollY / this.props.speed, this.props.timing);
  }

  render() {
    const { text, hover } = this.props;

    return (
      <button
        ref={(instance) => { this.btn = instance; }}
        style={this.state.hover ? { ...this.state.style, ...hover } : this.state.style}
        onClick={this.handleClickBack}
        onMouseOver={() => this.handleHover(true)}
        onMouseOut={() => this.handleHover(false)}
      >
        { this.ico }
        { text }
      </button>
    );
  }
}

BackToTop.defaultProps = {
  shape: 'default',
  text: '',
  icon: '',
  radius: 24,
  fontSize: '18px',
  position: {
    bottom: '10%',
    right: '5%',
  },
  color: 'white',
  background: '#ff5252',
  hover: {
    background: '#eb0000',
  },
  topDistance: 200,
  timing: 'linear',
  speed: 100,
};

BackToTop.propTypes = {
  shape: PropTypes.oneOf(['default', 'round']),
  radius: PropTypes.number,
  text: PropTypes.string,
  fontSize: PropTypes.string,
  position: PropTypes.shape({
    top: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string,
  }),
  icon: PropTypes.string,
  color: PropTypes.string,
  background: PropTypes.string,
  hover: PropTypes.object,
  topDistance: PropTypes.number,
  timing: PropTypes.oneOf(['linear', 'easeIn', 'easeOut', 'easeInOut']),
  speed: PropTypes.number,
};
export default BackToTop;
