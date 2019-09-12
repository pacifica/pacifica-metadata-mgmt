/* eslint-disable react/no-multi-comp */
import AppBar from '@material-ui/core/AppBar'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import DynamicTable from './Table'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import PropTypes from 'prop-types'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import { getObjectList } from './PacificaAPI'
import { withStyles } from '@material-ui/core/styles'

const drawerWidth = 240

// eslint-disable-next-line max-lines-per-function
const styles = function styles (theme) {
  return ({
    'appBar': {
      'transition': theme.transitions.create([
        'margin',
        'width'
      ], {
        'duration': theme.transitions.duration.leavingScreen,
        'easing': theme.transitions.easing.sharp
      })
    },
    'appBarShift': {
      'marginLeft': drawerWidth,
      'transition': theme.transitions.create([
        'margin',
        'width'
      ], {
        'duration': theme.transitions.duration.enteringScreen,
        'easing': theme.transitions.easing.easeOut
      }),
      'width': `calc(100% - ${drawerWidth}px)`
    },
    'content': {
      'flexGrow': 1,
      'marginLeft': -drawerWidth,
      // eslint-disable-next-line no-magic-numbers
      'padding': theme.spacing.unit * 3,
      'transition': theme.transitions.create('margin', {
        'duration': theme.transitions.duration.leavingScreen,
        'easing': theme.transitions.easing.sharp
      })
    },
    'contentShift': {
      'marginLeft': 0,
      'transition': theme.transitions.create('margin', {
        'duration': theme.transitions.duration.enteringScreen,
        'easing': theme.transitions.easing.easeOut
      })
    },
    'drawer': {
      'flexShrink': 0,
      'width': drawerWidth
    },
    'drawerHeader': {
      'alignItems': 'center',
      'display': 'flex',
      'padding': '0 8px',
      ...theme.mixins.toolbar,
      // eslint-disable-next-line sort-keys
      'justifyContent': 'flex-end'
    },
    'drawerPaper': {
      'width': drawerWidth
    },
    'hide': {
      'display': 'none'
    },
    'menuButton': {
      'marginLeft': 12,
      'marginRight': 20
    },
    'root': {
      'display': 'flex'
    }
  })
}

const ChevronByDirection = function ChevronByDirection ({ direction }) {
  if (direction === 'ltr') {
    return (
      <ChevronLeftIcon />
    )
  }
  return (
    <ChevronRightIcon />
  )
}

ChevronByDirection.propTypes = {
  'direction': PropTypes.oneOf([
    'ltr',
    'gtr'
  ]).isRequired
}

class App extends React.Component {
  static propTypes = {
    'MDUrl': PropTypes.string.isRequired,
    'classes': PropTypes.shape({
      'appBar': PropTypes.string.isRequired,
      'appBarShift': PropTypes.string.isRequired,
      'content': PropTypes.string.isRequired,
      'contentShift': PropTypes.string.isRequired,
      'drawer': PropTypes.string.isRequired,
      'drawerHeader': PropTypes.string.isRequired,
      'drawerPaper': PropTypes.string.isRequired,
      'hide': PropTypes.string.isRequired,
      'menuButton': PropTypes.string.isRequired,
      'root': PropTypes.string.isRequired
    }).isRequired,
    'theme': PropTypes.shape({
      'direction': PropTypes.oneOf([
        'ltr',
        'gtr'
      ]).isRequired,
      'withTheme': PropTypes.bool
    }).isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      'objectList': ['users'],
      'open': false,
      'selectedObject': 'users'
    }
    this.dynamicTableElement = React.createRef()
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
  }

  selectObject (text) {
    // eslint-disable-next-line no-console
    this.dynamicTableElement.current.updateData(text).catch((err) => console.log(err))
    this.setState({ 'selectedObject': text })
  }

  handleDrawerOpen () {
    const { MDUrl } = this.props
    getObjectList(MDUrl).then((res) => {
      this.setState({
        'objectList': res.data.available_objects,
        'open': true
      })
    })
      .catch((res) => { this.setState({ 'open': false }) })
  }

  handleDrawerClose () {
    this.setState({ 'open': false })
  }

  iterateOverList (items, index) {
    const [
      itemId,
      itemPrimary
    ] = items
    const boundItemClick = this.selectObject.bind(this, itemId)
    return (
      <ListItem
        button
        id={`listitem-${itemId.replace(/_/gu, '-')}`}
        key={itemId}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={boundItemClick}
      >
        <ListItemText primary={itemPrimary} />
      </ListItem>
    )
  }

  // eslint-disable-next-line max-lines-per-function
  render () {
    const { classes, theme, MDUrl } = this.props
    const { open, objectList, selectedObject } = this.state

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          // eslint-disable-next-line react/forbid-component-props
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
          position="fixed"
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              aria-label="Open drawer"
              // eslint-disable-next-line react/forbid-component-props
              className={classNames(classes.menuButton, open && classes.hide)}
              color="inherit"
              id="header-open-drawer"
              onClick={this.handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              color="inherit"
              id="title-text"
              noWrap
              variant="h6"
            >
              {'Pacifica Metadata Management'}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          // eslint-disable-next-line react/forbid-component-props
          className={classes.drawer}
          classes={{
            'paper': classes.drawerPaper
          }}
          open={open}
          variant="persistent"
        >
          <div className={classes.drawerHeader}>
            <IconButton
              id="drawer-close-drawer"
              onClick={this.handleDrawerClose}
            >
              <ChevronByDirection direction={theme.direction} />
            </IconButton>
          </div>
          <Divider />
          <List>
            {Object.entries(objectList).sort()
              .map(this.iterateOverList.bind(this))}
          </List>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <DynamicTable
            MDUrl={MDUrl}
            object={selectedObject}
            ref={this.dynamicTableElement}
          />
        </main>
      </div>
    )
  }
}

export default withStyles(styles, { 'withTheme': true })(App)
