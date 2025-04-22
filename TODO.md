# Tasks
* Add notes to scenarios
* Add notes to campaigns

# Problems 
# Testing

# Ideas
* Move remove objective button to a nicer place
* Add accumulate resource and task to gather resource to identity
* Change identities to allow for multiple
* Add protect unit/building to identity
* Distinguish between success effects vs failure effects

# Solved Problems
* I did not work out the details of why, but having objective components be hardcoded into the form component seems to have caused the strange behavior with adding new components filling out inputs in other objective components
* I was able to select multiple radio buttons because they did not have the same name. Then I needed to make their names dynamic so that, for example, the identity buttons for objective 1 were grouped separate from the identity buttons for objective 2
* I can label objective ids by keeping track of the objective index and passing in the value as a number as a prop, using v-bind so it's not treated as just a string
* I made input sections be horizontal but fields vertical by using flex display with both but changing the flex direction
* I think it was setting all of the checkboxes to checked when I hit submit because I did not have the v-model hooked up correctly?
* I updated the form data by having each input call an event when it changed, passing in a key (the attribute (priority, time, etc)) and a value (primary, secondary, untimed, etc). The parent component keeps track of each objective's index, and when the update occurs, it updates the proper objectives attributes according to the key-value pair passed back.
* I can access an array from the back by using .at() instead of [index]
* The tabs were not updating because vars are not reactive in view; that's why it's necessary to use a const with a ref()