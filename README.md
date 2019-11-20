# Compressed-tries
Compressing the trie and merging the common branches can sometimes yield large performance gains.This project suggest auto-complete results based on a partial string.

# Query Serving Program 
We will get as input a long list of (name, score) pairs. We want to create a program that takes a list of these name score pairs and then suggests the top 10 names (by score) that match a query string given by a user. We will consider a name to be a match for a query if: <br />
    The query is a prefix of the name. Ex. The query “alv” would match the name “alvin” <br />
    The query is a prefix of a part of the name following an underscore. Ex. The query “alv” would match the name “vega_alvin” because even though it is not a prefix of the whole name, it is a prefix of the substring “alvin” following an underscore. Note that other substring matches that are not after an underscore do NOT count as matches.
         
# Serialization 
In addition to creating the query serving program, we would like to be able to serialize any underlying data structure this program uses. We should be able to save this structure to disk and then load it back later without rebuilding it from the original list of name score pairs. 

# Getting Started
npm install<br />
set RAW_FILE= PATH TO test_data.csv<br />
set SERIALIZED_FILE= PATH TO serialize.txt<br />
node app.js [args] – Eg--- node app.js pi
