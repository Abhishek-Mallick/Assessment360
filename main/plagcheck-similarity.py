import nltk
import websearch
from difflib import SequenceMatcher
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import matplotlib as mpl

nltk.download('stopwords')
nltk.download('punkt')
stop_words = set(nltk.corpus.stopwords.words('english')) 

def purifyText(string):
    words = nltk.word_tokenize(string)
    return (" ".join([word for word in words if word not in stop_words]))

def webVerify(string, results_per_sentence):
    sentences = nltk.sent_tokenize(string)
    matching_sites = []
    n = 0
    for url in websearch.searchBing(query=string, num=results_per_sentence):
        matching_sites.append(url)
        n+=1
        if(n==10):
            break
    for sentence in sentences:
        for url in websearch.searchBing(query = sentence, num = results_per_sentence):
            matching_sites.append(url)
            break

    return (list(set(matching_sites)))

def similarity(str1, str2):
    return (SequenceMatcher(None, str1, str2).ratio())*(100)


def report(text):
    matching_sites = webVerify(purifyText(text), 20)
    matches = {}

    for i in range(len(matching_sites)):
        matches[matching_sites[i]] = similarity(text, websearch.extractText(matching_sites[i]))

    matches = {k: v for k, v in sorted(matches.items(), key=lambda item: item[1], reverse=True)}

    return matches

def returnTable(dictionary):
    df = pd.DataFrame.from_dict(dictionary, orient='index', columns=['Similarity (%)'])
    df.index.name = "Matching Sources"
    df.columns.name = None
    
    # Define a color map
    cmap = plt.cm.get_cmap('RdYlGn')
    
    # Map colors to each row in the DataFrame
    colors = df['Similarity (%)'].apply(lambda x: cmap(x/100))
    
    # Format the DataFrame with background colors
    formatted_df = df.style.background_gradient(cmap=cmap, subset=['Similarity (%)'], low=0, high=0.4)\
                        .set_table_styles([{'selector': 'th', 'props': [('background-color', '#dcdcdc'), ('color', 'black'), 
                                                                          ('border', '1px solid #ddd'), ('font-weight', 'bold'), 
                                                                          ('text-align', 'center'), ('vertical-align', 'middle')]}])\
                        .set_properties(**{'text-align': 'center', 'border': '1px solid #ddd', 'vertical-align': 'middle'})\
                        .set_caption('Similarity Report')\
                        .format({'Similarity (%)': '{:.2f}%'.format})
    
    return formatted_df.render()

if __name__ == '__main__':
    report('This is a pure test')
