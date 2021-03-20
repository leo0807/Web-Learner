
def subString(sub_s):
    string = ''
    i = 0
    for s in sub_s:
        flag = findSign(sub_s)
        if not flag:
            if type(s).__name__ == 'str':
                string += "\"" + s + "\"" + ' AND '
            else:
                string += subString(s) + ")" + ' AND '
        else:
            string += "\""+s+"\""

            if i < len(sub_s)-1:
                string += ' OR '
        i += 1
    return '(' + string + ')'


def findSign(str):
    for s in str:
        if (type(s).__name__) != 'str':
            return False
    return True


inp = [[["java", "maven", ["Hibernate", "nignx"], "spring"], "python"],
       ["machine learning", "deep learning"]]
string = subString(inp)
s1 = list(string)
s1[0] = ''
s = ''.join(s1)
s = s.replace('AND )', '')
print(s)
