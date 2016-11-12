function button_pulse(  ) {
//Body: Javascript code
//duration  float value, in seconds, defaults to 2.0
//from  float value, defaults to 0.0, the minimal opacity during the pulsate, in a value between 0.0 and 1.0. For example, use 0.7 for a mild pulsate
//pulses  integer value, defaults to 5, the amount of pulses within the duration time
    Effect.Pulsate(widget_id, { pulses: 5, duration: 2.0 });
}
