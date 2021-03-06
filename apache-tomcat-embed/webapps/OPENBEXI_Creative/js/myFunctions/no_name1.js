function no_name1( widget_id ) {
//duration  float value, in seconds, defaults to 2.0
//from  float value, defaults to 0.0, the minimal opacity during the pulsate, in a value between 0.0 and 1.0. For example, use 0.7 for a mild pulsate
//pulses  integer value, defaults to 5, the amount of pulses within the duration time
    Effect.Pulsate(widget_id, { pulses: 5, duration: 2.0 });
//duration  float value, in seconds, defaults to 0.5
//distance  integer value, defaults to 20, the number of pixels to move horizontally
    Effect.Shake(widget_id, { duration: 0.5, distance: 20 });
}
