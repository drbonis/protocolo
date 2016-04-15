a = "var ciaps4List = [".strip

i = 1
lines = File.readlines('ciap4d_preferred.txt')
lines.each do |line|
    line = line.gsub("\'"," ")
    line = line.gsub("(NO MAPEA)","")
    line = line.gsub(".0","")
    splited = line.scrub!.split('|')
    b = "'"+splited[0].strip+" "+splited[1].strip+"'".strip
    
    if i<lines.length
        c = ","
    else
        c = ""
    end
    a << b << c
    i = i + 1


end
a << "]".strip

File.write('ciaps4.json.js', a)