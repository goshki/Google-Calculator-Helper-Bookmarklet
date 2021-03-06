/*
 * Copyright (c) 2010 Adrian K. <goshki@gmail.com>
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Google Calculator Helper Bookmarklet
 *
 * @author Adrian K. <goshki@gmail.com>
 * @version 1.0
 */
javascript:( function() {
	var ASKPROXY = 'ENTER URL TO YOUR ask.php HERE';
	function run( $ ) {
		if ( typeof $ != 'undefined' ) {
			$( '#bgch-wrapper' ).remove();
			// Make place on top for our helper
			$( '*' ).each( function() {
				var zIndex = Number( $( this ).css( 'z-index' ) );
				if ( zIndex >= 99999 ) {
					$( this ).css( { zIndex: 99998 } );
				}
			} );
			var wrapper = $( '<div/>' ).attr( {
				id: 'bgch-wrapper'
			} ).css( {
				position: 'fixed',
				top: '5px',
				left: '5px'
			} );
			var container = $( '<div/>' ).attr( {
				id: 'bgch-container'
			} ).css( {
				position: 'absolute',
				border: '2px solid #ccccb0',
				backgroundColor: '#ffffe0',
				padding: '5px',
				minWidth: '410px',
				zIndex: 99999
			} );
			var query = $( '<input/>' ).attr( {
				id: 'bgch-query'
			} ).css( {
				border: '1px solid #ccccb0',
				width: '300px'
			} ).keypress( function( e ) {
				if ( e.which == 13 ) {
					$( '#bgch-submit' ).click();
				}
			} );
			var result = $( '<div/>' ).attr( {
				id: 'bgch-result'
			} ).css( {
				color: '#000',
				font: 'normal 10px/125% monospace',
				display: 'none',
				padding: '5px 0 0',
				textAlign: 'left'
			} );
			var submit = $( '<input/>' ).attr( {
				id: 'bgch-submit',
				type: 'button',
				value: '='
			} ).click( function() {
				var query = $.trim( $( '#bgch-query' ).val() );
				if ( query.length == 0 ) {
					return;
				}
				if ( query.indexOf( '=' ) == -1 ) {
					query += ' =';
				}
				var result = $( '<div/>' ).css( { paddingTop: '5px' } ).append( $( '<b/>' ).
					text( query + '> ' ) );
				var encodedQuery = encodeURIComponent( query );
				$.getJSON( ASKPROXY + '?q=' +  encodedQuery + '&callback=?', function( data ) {
					if ( data.result ) {
						result.append( $( '<span/>' ).html( data.result ) );
					}
					else {
						result.append( $( '<span/>' ).css( {
							color: '#f00'
						} ).text( 'Could not retrieve result.' ) );
					}
				} );
				$( '#bgch-result' ).css( {
					display: 'block'
				} ).append( result );
			} );
			var clear = $( '<input/>' ).attr( {
				id: 'bgch-clear',
				type: 'button',
				value: '[]'
			} ).click( function() {
				$( '#bgch-result' ).empty();
			} );
			var close = $( '<input/>' ).attr( {
				id: 'bgch-close',
				type: 'button',
				value: 'x'
			} ).click( function() {
				$( '#bgch-wrapper' ).remove();
			} );
			wrapper.append( container.append( query ).append( submit ).append( clear ).append( close ).
				append( result ) );
			if( $( 'body > :first-child' ).size() > 0 ) {
				$( 'body > :first-child' ).before( wrapper );
			}
			else {
				$( 'body' ).append( wrapper );
			}
		}
	}
	if ( typeof bjQuery == 'undefined' ) {
		var head = document.getElementsByTagName( 'head' )[0];
		var script = document.createElement( 'script' );
		script.language = 'JavaScript';
		script.type = 'text/javascript';
		script.src = 'http://code.jquery.com/jquery-1.4.min.js';
		script.onload = function() {
			bjQuery = jQuery.noConflict( true );
			run( bjQuery );
		};
		head.appendChild( script );
	}
	else {
		run( bjQuery );
	}
} )();