<?php
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
 * Google Calculator Helper Bookmarklet simple JSONP proxy
 *
 * @author Adrian K. <goshki@gmail.com>
 * @version 1.0
 */
define( 'HOSTNAME', 'http://www.google.com/' );

$query = $_GET['q'];
$callback = $_GET['callback'];
$url = HOSTNAME . 'sms/demo?q=' . rawurlencode( $query );
$userAgent = "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.1) Gecko/20061204 Firefox/2.0.0.1";

$session = curl_init( $url );

curl_setopt( $session, CURLOPT_USERAGENT, $userAgent );
curl_setopt( $session, CURLOPT_HEADER, false );
curl_setopt( $session, CURLOPT_RETURNTRANSFER, true );

$html = curl_exec( $session );

$result = "Google didn't know! :O";

if ( preg_match( "/'(.*)(\<br\>\<br\>)/", $html, $matches ) ) {
	$result = $matches[1];
}

header( 'X-Url: ' . $url );
header( 'Content-Type: text/html' );
header( 'X-Matches: ' . serialize( $matches ) );

echo $callback . '( { result: "' . strtr( $result, array( '"' => '\"' ) ) . '" } );';
curl_close( $session );
?>