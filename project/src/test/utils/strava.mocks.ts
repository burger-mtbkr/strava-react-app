import { IStravaActivity } from 'src/models';

export const mockAthlete = {
  id: 12345,
  resource_state: 1,
  username: 'bob.bikes',
  firstname: 'bob',
  lastname: 'biker',
  city: '',
  state: '',
  country: '',
  sex: '',
  premium: true,
  created_at: '',
  updated_at: '',
  badge_type_id: 100,
  profile_medium: '',
  profile: '',
  friend: '',
  follower: '',
  follower_count: 100,
  friend_count: 50,
  mutual_friend_count: 10,
  athlete_type: 1,
  date_preference: '',
  measurement_preference: 'metric',
  clubs: [],
  ftp: 300,
  weight: 75,
  bikes: [],
  shoes: [],
};

export const mockStravaSession = {
  token_type: 'token',
  expires_at: Math.round(+new Date(2099, 12, 31) / 1000),
  expires_in: 181164654564564,
  refresh_token: 'abcdef',
  access_token: 'kjghkjhiughu',
  athlete: mockAthlete,
};

export const mockAthleteStats = {
  biggest_ride_distance: 300,
  biggest_climb_elevation_gain: 1280,
  recent_ride_totals: {
    count: 1688,
    distance: 76824,
    moving_time: 1536,
    elapsed_time: 57,
    elevation_gain: 12300,
    achievement_count: 17,
  },
  recent_run_totals: {
    count: 0,
    distance: 0,
    moving_time: 0,
    elapsed_time: 0,
    elevation_gain: 0,
    achievement_count: 0,
  },
  recent_swim_totals: {
    count: 0,
    distance: 0,
    moving_time: 0,
    elapsed_time: 0,
    elevation_gain: 0,
    achievement_count: 0,
  },
  ytd_ride_totals: {
    count: 0,
    distance: 0,
    moving_time: 0,
    elapsed_time: 0,
    elevation_gain: 0,
    achievement_count: 0,
  },
  ytd_run_totals: {
    count: 0,
    distance: 0,
    moving_time: 0,
    elapsed_time: 0,
    elevation_gain: 0,
    achievement_count: 0,
  },
  ytd_swim_totals: {
    count: 0,
    distance: 0,
    moving_time: 0,
    elapsed_time: 0,
    elevation_gain: 0,
    achievement_count: 0,
  },
  all_ride_totals: {
    count: 0,
    distance: 0,
    moving_time: 0,
    elapsed_time: 0,
    elevation_gain: 0,
    achievement_count: 0,
  },
  all_run_totals: {
    count: 0,
    distance: 0,
    moving_time: 0,
    elapsed_time: 0,
    elevation_gain: 0,
    achievement_count: 0,
  },
  all_swim_totals: {
    count: 0,
    distance: 0,
    moving_time: 0,
    elapsed_time: 0,
    elevation_gain: 0,
    achievement_count: 0,
  },
};

export const mockStravaActivities: Array<IStravaActivity> = [
  {
    resource_state: 2,
    athlete: mockAthlete,
    name: 'Watopia',
    distance: 20124.6,
    moving_time: 2827,
    elapsed_time: 2827,
    total_elevation_gain: 167.0,
    type: 'VirtualRide',
    id: 6254610372,
    external_id: 'zwift-activity-947506257168711696.fit',
    upload_id: 6647193668,
    start_date: new Date('2021-11-14T03:23:15Z'),
    start_date_local: new Date('2021-11-14T16:23:15Z'),
    timezone: '(GMT+12:00) Pacific/Auckland',
    utc_offset: 46800.0,
    start_latlng: [-11.635574251413345, 166.95122480392456],
    end_latlng: [-11.634732037782669, 166.97674870491028],
    location_city: undefined,
    location_state: undefined,
    location_country: 'New Zealand',
    start_latitude: -11.635574251413345,
    start_longitude: 166.97674870491028,
    achievement_count: 1,
    kudos_count: 37,
    comment_count: 0,
    athlete_count: 1,
    photo_count: 0,
    map: {
      id: 'a6254610372',
      summary_polyline:
        'jq_fAct~y^pAdDd@n@fBzAxDrBjGhBrA~@r@nAxAnE|@dB@b@_@L_BaBw@Wq@?}@\\i@fA@p@VnAdCbIfBpER~@GZ{@`AYvAyAxA_A~BD|@n@hAx@rCx@d@h@Gb@St@eBnAKz@g@h@Jl@v@`@`EMhA@vAIJkAHYb@IhBPj@rC~B~@Zn@IvD}Aj@?\\`@@LGL{ALkA\\ONETJPrAMbETbBa@bB{@x@y@Zy@d@gCPYnA{@`@m@tEkI`@oAd@sCJqCi@qJ@_Dv@{Gp@iCj@y@tCoBn@cAp@c@pA]r@?xAn@|@GR_@G]_A_@CSd@SdBD\\k@A[W[gA?]IiAwC@YZUdB_@Vc@@_@WkAmBaCIe@IoBQi@_Ac@oAO{BEmCb@w@?q@OESAOJMr@KbK}@l@SR[O[q@CiKrAq@KSYLq@d@_@`B_@~G{@`A[V[G_@oBuDoDyHOo@Au@^qAd@c@n@YbAPf@^p@hApCxJp@`AbCFlI[`_@dGb@LRTJvEFXZT`@@XSHe@T_DjAaCZSP?XRTr@s@hGNlAXd@`Bv@`Dx@tPlDz@@b@]nAwCt@eAzCeBd@yBNUrCuAZYv@aDvAoBh@kDBcDO}BFo@f@aAVOXMrBUlAsANc@D}@Kg@QUqAe@o@}AGq@VeAPUj@Y~AsAr@WNSDi@_@yAEgB^_Bt@aAFk@I_@a@m@?WNSXKr@j@XB|@_AfASZYDu@Ui@o@o@Bq@|@mAVgANSb@Ut@Cd@SNUJy@K_A\\gALeBj@iCOo@yAoCaAgAeGiEaCiAyAc@gF_AqEUcDL_I~@sFvAeD|AyCBk@b@Ot@@^fA~ADZG~AJ\\hBjB@~@M\\{@Js@g@uA_B_@I]HsA|Ao@`@_FfBq_@zIuV|GoBz@Uh@LhAbBdFQRaLtCqEl@eBDiAU{@i@mD_FmAeAuBs@{@EwAL_Bh@eBvAsBdFc@n@m@d@yBj@iN~AmDx@oCnAuB|Be@?aAy@m@gAQ}@AuANkA\\kAvB_Eh@gBf@eEAyD_@wD_@}Ak@cA}@s@C{@Uc@_@[Uy@QkBPuAx@gCj@kCd@gAZcCBmAMu@}@aBo@a@mCe@w@wA_BaGIq@Bq@r@gDA_Ag@mAu@iA',
      resource_state: 2,
    },
    trainer: false,
    commute: false,
    manual: false,
    private: false,
    visibility: 'everyone',
    flagged: false,
    gear_id: 'b4278251',
    from_accepted_tag: false,
    upload_id_str: '6647193668',
    average_speed: 7.119,
    max_speed: 18.008,
    average_cadence: 71.1,
    average_watts: 133.8,
    max_watts: 528,
    weighted_average_watts: 156,
    kilojoules: 378.2,
    device_watts: true,
    has_heartrate: true,
    average_heartrate: 110.5,
    max_heartrate: 152.0,
    heartrate_opt_out: false,
    display_hide_heartrate_option: true,
    elev_high: 100.4,
    elev_low: -6.4,
    pr_count: 0,
    total_photo_count: 0,
    has_kudoed: false,
    suffer_score: 10.0,
  },
  {
    resource_state: 2,
    athlete: mockAthlete,
    name: 'Ascenders Team Singapore Zwift Ride',
    distance: 100453.0,
    moving_time: 8929,
    elapsed_time: 8929,
    total_elevation_gain: 316.0,
    type: 'VirtualRide',
    id: 6249472541,
    external_id: 'zwift-activity-946632933752455168.fit',
    upload_id: 6641691425,
    start_date: new Date('2021-11-12T22:30:26Z'),
    start_date_local: new Date('2021-11-13T11:30:26Z'),
    timezone: '(GMT+12:00) Pacific/Auckland',
    utc_offset: 46800.0,
    start_latlng: [-11.634821891784668, 166.97337985038757],
    end_latlng: [-11.637139320373535, 166.9662344455719],
    location_city: undefined,
    location_state: undefined,
    location_country: 'New Zealand',
    start_latitude: -11.634821891784668,
    start_longitude: 166.9662344455719,
    achievement_count: 1,
    kudos_count: 49,
    comment_count: 0,
    athlete_count: 73,
    photo_count: 0,
    map: {
      id: 'a6249472541',
      summary_polyline:
        'tl_fAs~bz^pAoNyBaGtE}@~@eGzHhBtCtL|LwDiAeF`DiJqJ}N|ImLoEoLbNqc@kLkNpIgTfJIbLgGd@wEaDgFpByBpKdL|EqGdDnApDxJ_EzDyA~_@zFdJrWkAu@d]jAhK~NfCvEdHxH{MrNlKFzHmMrH}FfJhFpLyCnEjCp@eHlDu@nJnIzOBtKqu@lSfAtJaJhCwL`AePuKcNxM__@fKqCwCjFoXuG}XhEaSaI_IoB{H{@aOpEq@fC{G|JtHMnFxM_DcAyFdDkIyJaPxI_LoEeLjNcd@oLwNvI{ShJEbLuG\\eEeDgF~B_ChKfLdIwFbF`KwDhFoAj`@lFrI|WeAw@`]hA`KnNdC~EnHxHwM~NzKAhHeLrGaHpKfFjL{CjElCn@qHbEe@jInInP@zKwt@~Rf@|JcI~BaN`A}NqKqNxMg_@fKsCqCjFgXqGoXdEiTyHaHsBaI}@cOxE}@rCoGjJpHInFjIWhC}CkAeFhDeI{JePxI{KkEyLfNic@mLsNnIeThJIdLqGb@aEaDsF|B{BtKjLjEuGpD~AdDhJaEjEqAz_@nFxI~WeAzAdSqCfHdAjKzNnCdFhHhIiM`NtKE~GsL`HoGbKdFrL{CbEnCx@oHrDi@lJhIhOFbL_u@hSz@nJcHxBoN|A{I_JkGo@_MrMyUlDuGtEaCsB|EkYqGmYfEiSwHyGwDeY|EgAhBuGrKrHAtFnMwDoAuEhDuIsJcPtIuKmEkLfN_d@gL_OzI_TvI@lL{GcBsNjDi@~HvKpEuGpDzAhD`K_EdD{Ad`@zFfJdX_AnAvT{@rStMhBzFrH|HoMrC~EhJfFQzFiUtSdFvLyChEnCh@mHbEk@bJjIxO?rLku@tRhAhJcH|BsNxA{PuKuMzMeUfDmH|EkCqBxEgYoGuYhEwR{HqHsDcYtEaA|BsG~JfHMtF~McDkAyElDcJ{J{OvI{KiEsLbNwc@gL{NpIwS~IIbLqGd@_EaBsIrCMbIvKjEqGbDjAxD|JaE`EuA|_@rF|IvWeA|AfUsC|GzApJtN|BpE`HbImMfNrKItHsLvGgGrJfF|L_DxDnChAgHjDm@|InIjP?rKit@zRgA~AnB~GsJnCiL~@uPsKyMtMc_@jKiCoCfF{XqGsXfEiS{HoHsB}H{@oOtEw@jCuGrJpHQlF~MeDgAyEdDeJwJqOvIaLkEkLhNoc@oL{NnIeThJG`LqGf@cEaDwFvBwBrKdLbF{G~C|AnDbKaElDwAx_@`GjJrW_ArA`ToC|Fz@pK`OrCvEjH|HyM~N`LGdHcUrSfFxLyCnEjCv@oHpDi@pIfIvOLrLyt@~Rn@zJwFbB}OhB{IaJ{Fk@iLjMc`@lKmC}FnF{Qw@_P',
      resource_state: 2,
    },
    trainer: false,
    commute: false,
    manual: false,
    private: false,
    visibility: 'everyone',
    flagged: false,
    gear_id: 'b4278251',
    from_accepted_tag: false,
    upload_id_str: '6641691425',
    average_speed: 11.25,
    max_speed: 17.864,
    average_cadence: 75.2,
    average_watts: 205.5,
    max_watts: 593,
    weighted_average_watts: 209,
    kilojoules: 1835.3,
    device_watts: true,
    has_heartrate: true,
    average_heartrate: 157.6,
    max_heartrate: 177.0,
    heartrate_opt_out: false,
    display_hide_heartrate_option: true,
    elev_high: 28.0,
    elev_low: -6.4,
    pr_count: 0,
    total_photo_count: 0,
    has_kudoed: false,
    suffer_score: 358.0,
  },
  {
    resource_state: 2,
    athlete: mockAthlete,
    name: 'Afternoon Ride',
    distance: 25664.7,
    moving_time: 3641,
    elapsed_time: 3730,
    total_elevation_gain: 276.0,
    type: 'Ride',
    workout_type: 10,
    id: 6236781461,
    external_id: 'garmin_push_7795347789',
    upload_id: 6628188431,
    start_date: new Date('2021-11-10T02:19:39Z'),
    start_date_local: new Date('2021-11-10T15:19:39Z'),
    timezone: '(GMT+12:00) Pacific/Auckland',
    utc_offset: 46800.0,
    start_latlng: [-37.18524648807943, 174.9173945467919],
    end_latlng: [-37.18527716584504, 174.91743184626102],
    location_city: undefined,
    location_state: undefined,
    location_country: 'New Zealand',
    start_latitude: -37.18524648807943,
    start_longitude: 174.91743184626102,
    achievement_count: 1,
    kudos_count: 41,
    comment_count: 0,
    athlete_count: 1,
    photo_count: 0,
    map: {
      id: 'a6236781461',
      summary_polyline:
        'xv}aFuprj`@DGBQCGMMWO[Eg@Em@BmBZMJAJH~@h@pBh@rA|@vA`A`At@h@~@d@b@JXLt@Nb@T@FCf@Q`AI\\M\\UZoB~AsKjIi@Tq@JkAJqA@SCQCu@UwEqBg@Q[C]B]N]\\sBbCk@l@[X[LWDW?SCUM[Uy@w@y@k@KEcBg@{D_Ai@Eo@Be@Rq@b@oAdASVIROh@aAlFGRW`@w@p@yEhDKF_@Da@Ac@Ky@]eAq@g@Me@CkKCa@DULSTo@dAy@nAm@`@q@\\OXC^BNzChMJtAKfBYlC@h@Fd@ZdBJ|@Bz@?n@Dr@xBvLPp@x@zBBPAVQ^{B~AyA~@gEdBcBhAaKpHW`@GZNd@FBXAfGqCrBgAnBuAnAoAjE_ErJcHbIeGrAw@tAa@|AOdABbB\\pAj@t@t@RXDb@ANSn@CT?ZHz@V|BFpDD`@VnA`BnFr@~A|@~Ap@p@zAhAbA|@`Al@l@XhCp@`Ct@fAf@nAr@\\\\Rh@R|Az@xHjDrYDNPVXFLA~]mFjBQJ?HDDJBNLpBrAfPtBrXd@pD`@nA~Rzf@dR|e@tEdLh@lAn@~AtCbHrHdQxIxRrErJ~D|IZh@DBJ@tT_SxTwRbT_Rda@y^nWsTlDqCpAoA`@i@XiARQl@SbCsAf@]pDaDzKiKbPoObWuUdHmHpOeOzFsFXYR]HWBUUaJC}@G]Oe@SWiE}CYUY_@]{@iByF]w@W]u@g@qLyGqA{@{KaKkPwPk@g@s@ScAGmFQcLi@sMo@{Jk@iKc@gOs@{CM_@Bg@Ek@AgGWcSs@iAC{A?]Ea@IQAcVkAuOk@a@?y@IwAEU@q@KkBIsAKiB?gAO_BIs@Ck@?UEuDMgA@GUJy@J}CCy@I}CKg@AeCQqDQ{F?q@H}@G[SU_@Gc@ByG~@}Et@wCT}BHgCAaEDkCRi@@eD`@c@BOCKIIa@FkA^wB`@{AXg@RSbBu@v@g@X[d@y@J]Hc@Fw@Aw@Ik@a@kAc@k@MMeBmAs@u@U_@g@gAkAwCOi@MeACk@AaAB{@\\uEHa@Vg@nAsBVuB?s@CYEQEES?c@FgDn@q@PqB\\uHfAqATG@w@ISF_@T[Mq@M_AyBs@[cAw@ECK?KL',
      resource_state: 2,
    },
    trainer: false,
    commute: false,
    manual: false,
    private: false,
    visibility: 'everyone',
    flagged: false,
    gear_id: 'b8267184',
    from_accepted_tag: false,
    upload_id_str: '6628188431',
    average_speed: 7.049,
    max_speed: 14.83,
    average_cadence: 73.4,
    average_temp: 26,
    average_watts: 127.3,
    kilojoules: 463.6,
    device_watts: false,
    has_heartrate: true,
    average_heartrate: 124.0,
    max_heartrate: 152.0,
    heartrate_opt_out: false,
    display_hide_heartrate_option: true,
    elev_high: 156.2,
    elev_low: 53.0,
    pr_count: 0,
    total_photo_count: 0,
    has_kudoed: false,
    suffer_score: 30.0,
  },
];
