#!/bin/sh

i=1
for file in `ls *.jpg`
do
	echo mv $file $i.jpg
	mv $file $i.jpg
	let i++
done