import React, { Component } from 'react';
import EventForm from '../components/event/event-form';
import edit_event_from_parent from '../actions/edit-event-from-parent';
import get_countries from '../actions/countries';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { reset } from 'redux-form';
import get_cities from '../actions/cities';
import {
    setEventFromParentError,
    setEventFromParentPending,
    setEventFromParentSuccess
}
    from '../actions/edit-event-from-parent';
import * as moment from 'moment';
import { validateEventForm } from '../components/helpers/helpers'
import get_categories from '../actions/category-list';

class EditFromParentEventWraper extends Component {

    componentWillMount = () => {
        this.props.get_countries();
        this.props.get_categories();
        this.props.get_cities(this.props.initialValues.countryId);
    }

    componentDidUpdate = () => {
        if (!this.props.edit_event_from_parent_status.eventFromParentError && 
            this.props.edit_event_from_parent_status.isEventFromParentSuccess) {
            this.props.reset();
        }
    }

    componentWillUnmount() {
        this.props.reset();
    }

    onSubmit = (values) => {
        if (values.isReccurent) {
            values.isReccurent = false;
        }
        this.props.edit_event_from_parent({ ...validateEventForm(values), user_id: this.props.user_id });
    }

    onChangeCountry = (e) => {
        this.props.get_cities(e.target.value);
    }

    render() {
        let data = {
            ...this.props.initialValues,
            dateFrom: this.props.occurenceEvent.nextRun,
            dateTo: new moment(this.props.initialValues.dateTo)
                .add(new moment(this.props.occurenceEvent.nextRun)
                    .diff(new moment(this.props.initialValues.dateFrom), 'days'), 'days')
        }

        return <>
            <EventForm
                all_categories={this.props.all_categories}
                cities={this.props.cities.data}
                onChangeCountry={this.onChangeCountry}
                onSubmit={this.onSubmit}
                countries={this.props.countries.data}
                initialValues={data}
                haveReccurentCheckBox={false}
                disabledDate={true}
                isCreated={true} />
        </>
    }
}

const mapStateToProps = (state) => ({
    user_id: state.user.id,
    edit_event_from_parent_status: state.edit_event_from_parent,
    countries: state.countries,
    cities: state.cities,
    all_categories: state.categories.data,
    occurenceEvent: state.occurenceEvent.data,
    initialValues: state.event.data,
});

const mapDispatchToProps = (dispatch) => {
    return {
        edit_event_from_parent: (data) => dispatch(edit_event_from_parent(data)),
        get_countries: () => dispatch(get_countries()),
        get_cities: (country) => dispatch(get_cities(country)),
        get_categories: () => dispatch(get_categories()),
        resetEvent: () => dispatch(reset('event-form')),
        alert: (data) => dispatch(setAlert(data)),
        reset: () => {
            dispatch(setEventFromParentPending(true));
            dispatch(setEventFromParentSuccess(false));
            dispatch(setEventFromParentError(null));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFromParentEventWraper);