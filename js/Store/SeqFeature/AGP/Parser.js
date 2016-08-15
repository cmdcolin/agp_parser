define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'AGPParser/Util/AGP'
],
function(
    declare,
    array,
    lang,
    AGP
) {

    return declare( null, {

        constructor: function( args ) {
            lang.mixin( this, {
                featureCallback: args.featureCallback || function() {},
                endCallback: args.endCallback || function() {},
                commentCallback: args.commentCallback || function() {},
                errorCallback: args.errorCallback || function(e) { console.error(e); },
                directiveCallback: args.directiveCallback || function() {},
                eof: false
            });
        },

        addLine: function( line ) {
            var match;
            if ( this.eof ) {
                // do nothing
            } else if ( /^\s*[^#\s>]/.test(line) ) { // < feature line, most common case
                var f = AGP.parse_feature( line );
                this._buffer_feature( f );
            }
            else if (( match = /^\s*(\#+)(.*)/.exec( line ) )) {
            }
            else if ( /^\s*$/.test( line ) ) {
            }
            else {
                line = line.replace( /\r?\n?$/g, '' );
                throw "AGP parse error.  Cannot parse '" + line + "'.";
            }
        },

        _return_item: function(i) {
            if ( i[0] ) {
                this.featureCallback( i );
            }
            else if ( i.directive ) {
                this.directiveCallback( i );
            }
            else if ( i.comment ) {
                this.commentCallback( i );
            }
        },

        finish: function() {
            this._return_all_under_construction_features();
            this.endCallback();
        },

        _return_all_under_construction_features: function() {

        },

        container_attributes: { Parent: 'child_features', Derives_from: 'derived_features' },

        _buffer_feature: function( feature_line ) {
            console.log(feature_line);
        }
    });
});
