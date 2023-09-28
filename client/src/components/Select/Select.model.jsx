import PropTypes from 'prop-types'

const SelectModelProps = {
    // Value the select menu holds
    value: PropTypes.any.isRequired,

    // EventHandler
    onChange: PropTypes.func.isRequired,

    // Item
    item: PropTypes.any
}

export default SelectModelProps