import React, {Component, PropTypes} from 'react'
import InterestingProjects from './InterestingProjects'
import Success from './Success'
import Loading from '../common/Loading'
import ValidationMessages from '../views/general/validationMessages'

class Monitor extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let content

    if (this.props.error) {
      const errorMessages = [
        'Unable to fetch projects because of an error:',
        `${this.props.error.status} - ${this.props.error.message}`
      ]
      content = (
        <div className='monitor-error'>
          <ValidationMessages messages={errorMessages}/>
        </div>
      )
    } else if (this.props.projects.length > 0) {
      content =
        <InterestingProjects projects={this.props.projects}
                             showBrokenBuildTimers={this.props.showBrokenBuildTimers}
                             playBrokenBuildSounds={this.props.playBrokenBuildSounds}
                             brokenBuildFx={this.props.brokenBuildFx}/>

    } else {
      content = <Success message={this.props.successMessage()} />
    }

    return <div className='monitor' onMouseMove={this.props.showMenu}>
      <Loading loading={this.props.loading}>
        {content}
      </Loading>
    </div>
  }

  componentDidMount() {
    this.props.poll()
  }

  componentWillUnmount() {
    this.props.stopPolling()
  }
}

Monitor.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.shape({
    status: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired
  }),
  loading: PropTypes.bool.isRequired,
  brokenBuildSoundEnabled: PropTypes.bool.isRequired,
  poll: PropTypes.func.isRequired,
  stopPolling: PropTypes.func.isRequired,
  showMenu: PropTypes.func.isRequired,
  showBrokenBuildTimers: PropTypes.bool,
  playBrokenBuildSounds: PropTypes.bool,
  brokenBuildFx: PropTypes.string,
  successMessage: PropTypes.func.isRequired
}

export default Monitor
